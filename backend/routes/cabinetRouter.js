const express = require('express');
const { sendResponse } = require('../utils/util');
const { getCabinetInfoByFloor } = require('../db/query');
const pool = require('../config/database');

const cabinetRouter = express.Router();

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

cabinetRouter.get('/count/floor', getCabinetCountFloor);

module.exports = { cabinetRouter };
