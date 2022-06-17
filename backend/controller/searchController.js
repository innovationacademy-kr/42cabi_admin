const query = require('../db/query');
const { isNumeric, sendResponse } = require('../utils/util');
const pool = require('../config/database');
// intra_id, cabinetNum 검색 기능
const getSearch = async (req, res) => {
  const { intraId, cabinetNum, floor } = req.query;

  if (Number.isNaN(cabinetNum)) {
    return sendResponse(res, 400, '잘못된 요청입니다.');
  }
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
        query.getLentLogByCabinetNum(connection, cabinetNum, floor),
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
module.exports = {
  getSearch,
};
