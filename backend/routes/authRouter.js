const express = require('express');

const authRouter = express.Router();
require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../util');
const { getJwtSecret } = require('../config/config');

authRouter.post('/login', (req, res) => {
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
});

module.exports = { authRouter };
