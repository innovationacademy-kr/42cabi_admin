const express = require('express');
const query = require('../db/query');
const { sendResponse, isNumeric } = require('../utils/util');
const pool = require('../config/database');

const activationRouter = express.Router();

// 고장 사물함 리스트 조회
const getInactivatedCabinet = async (_req, res) => {
  const connection = await pool.getConnection();
  try {
    const cabinetList = await query.getInactivatedCabinetList(connection);
    return sendResponse(res, cabinetList, 200);
  } finally {
    connection.release();
  }
};

const patchActivation = async (req, res) => {
  const { cabinetIdx, activation } = req.body;
  if (
    !cabinetIdx &&
    !activation &&
    !isNumeric(activation) &&
    !isNumeric(cabinetIdx)
  ) {
    return sendResponse(res, {}, 400);
  }

  const connection = await pool.getConnection();
  try {
    connection.beginTransaction();
    await query.modifyCabinetActivation(connection, cabinetIdx, activation);
    if (activation === 0)
      await query.addDisablelog(connection, cabinetIdx, activation);
    else
      await query.modifyDisablelog(connection, cabinetIdx, activation);
    connection.commit();

    return sendResponse(res, 'ok', 200);
  } catch(err) {
    connection.rollback();
    return sendResponse(res, err, 500);
  }
    finally {
    connection.release();
  }
};

activationRouter.get('/', getInactivatedCabinet);
activationRouter.patch('/', patchActivation);

module.exports = { activationRouter };
