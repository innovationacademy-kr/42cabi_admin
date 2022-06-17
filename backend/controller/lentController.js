const { getLentUserInfo, getLentOverdue } = require('../db/query');
const { sendResponse } = require('../utils/util');
const pool = require('../config/database');

const getLentInfo = async (_req, res) => {
  const connection = await pool.getConnection();
  try {
    const lentInfo = await getLentUserInfo(connection);
    return sendResponse(res, lentInfo, 200);
  } finally {
    connection.release();
  }
};

const getLentOverdueInfo = async (_req, res) => {
  const connection = await pool.getConnection();
  try {
    const overdueInfo = await getLentOverdue(connection);
    return sendResponse(res, overdueInfo, 200);
  } finally {
    connection.release();
  }
};

module.exports = {
  getLentInfo,
  getLentOverdueInfo,
};
