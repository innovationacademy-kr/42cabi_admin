const express = require('express');
const query = require('../db/query');
const { isNumeric, sendResponse } = require('../utils/util');
const pool = require('../config/database');

const searchRouter = express.Router();

// intra_id, cabinetNum 검색 기능
const getSearch = async (req, res) => {
  const { intraId, cabinetNum, floor } = req.query;

  const connection = await pool.getConnection();
  try {
    let resultFromLent;
    let resultFromLentLog;

    if (intraId) {
      [resultFromLent, resultFromLentLog] = await Promise.all([
        query.getLentByIntraId(connection, intraId),
        query.getLentLogByIntraId(connection, intraId),
      ]);
    } else if (
      cabinetNum &&
      floor &&
      isNumeric(cabinetNum) &&
      isNumeric(floor)
    ) {
      [resultFromLent, resultFromLentLog] = await Promise.all([
        query.getLentByCabinetNum(connection, cabinetNum, floor),
        await query.getLentLogByCabinetNum(connection, cabinetNum, floor),
      ]);
    } else {
      return sendResponse(res, {}, 400);
    }

    const result = { resultFromLent, resultFromLentLog };
    return sendResponse(res, result, 200);
  } finally {
    connection.release();
  }
};

searchRouter.get('/', getSearch);

module.exports = { searchRouter };
