const express = require('express');
const query = require('../db/query');
const { isNumeric, sendResponse } = require('../util');
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
      await Promise.all([
        (resultFromLent = await query.getLentByIntraId(connection, intraId)),
        (resultFromLentLog = await query.getLentLogByIntraId(
          connection,
          intraId
        )),
      ]);
    } else if (
      cabinetNum &&
      floor &&
      isNumeric(cabinetNum) &&
      isNumeric(floor)
    ) {
      await Promise.all([
        (resultFromLent = await query.getLentByCabinetNum(
          connection,
          cabinetNum,
          floor
        )),
        (resultFromLentLog = await query.getLentLogByCabinetNum(
          connection,
          cabinetNum,
          floor
        )),
      ]);
    } else {
      return sendResponse(res, {}, 400);
    }

    const result = { resultFromLent, resultFromLentLog };
    return sendResponse(res, result, 200);
  } catch (err) {
    console.log(err);
    return sendResponse(res, {}, 500);
  } finally {
    connection.release();
  }
};

searchRouter.get('/', getSearch);

module.exports = { searchRouter };
