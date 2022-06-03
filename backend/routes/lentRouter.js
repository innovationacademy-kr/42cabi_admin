const express = require('express');

const lentRouter = express.Router();
const { getLentUserInfo, getLentOverdue } = require('../db/query');
const { sendResponse } = require('../util');
const pool = require('../config/database');

const getLentInfo = async (_req, res) => {
  const connection = await pool.getConnection();
  try {
    const lentInfo = await getLentUserInfo(connection);
    return sendResponse(res, lentInfo, 200);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

const getLentOverdueInfo = async (_req, res) => {
  const connection = await pool.getConnection();
  try {
    const overdueInfo = await getLentOverdue(connection);
    return sendResponse(res, overdueInfo, 200);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

lentRouter.get('/', getLentInfo);

lentRouter.get('/overdue', getLentOverdueInfo);

module.exports = { lentRouter };
