const pool = require('../config/database');
const { sendResponse, isNumeric } = require('../utils/util');
const query = require('../db/query');

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
  const { cabinetIdx, activation, reason } = req.body;
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
      await query.addDisablelog(connection, cabinetIdx, reason);
    else await query.modifyDisablelog(connection, cabinetIdx);
    connection.commit();
    return sendResponse(res, 'ok', 200);
  } catch (err) {
    connection.rollback();
    console.log(err);
    return sendResponse(res, err, 500);
  } finally {
    connection.release();
  }
};

module.exports = {
  getInactivatedCabinet,
  patchActivation,
};
