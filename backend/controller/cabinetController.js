const { sendResponse } = require('../utils/util');
const { getCabinetInfoByFloor } = require('../db/query');
const pool = require('../config/database');

// 층별 사물함 현황(sum)
const getCabinetCountFloor = async (_req, res) => {
  const connection = await pool.getConnection();
  try {
    const cabientInfoByFloor = await getCabinetInfoByFloor(connection);
    return sendResponse(res, cabientInfoByFloor, 200);
  } finally {
    connection.release();
  }
};

module.exports = {
  getCabinetCountFloor,
};
