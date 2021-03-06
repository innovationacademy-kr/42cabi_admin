require('dotenv').config({ path: '../.env' });

const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/util');
const { getJwtSecret } = require('../config/config');
const pool = require('../config/database');
const query = require('../db/query');

const postLogin = (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return sendResponse(res, {}, 400, 'Input error');
  }
  if (id !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWORD) {
    return sendResponse(res, {}, 403, 'Authentication fail');
  }
  const payload = {};
  const accessToken = jwt.sign(payload, getJwtSecret(), { expiresIn: '24h' });

  return sendResponse(res, { accessToken }, 200, 'Authentication success');
};

const getBanUser = async (_req, res) => {
  const connection = await pool.getConnection();
  try {
    const banUser = await query.getBanUser(connection);
    return sendResponse(res, banUser, 200);
  } finally {
    connection.release();
  }
};

module.exports = {
  postLogin,
  getBanUser,
};
