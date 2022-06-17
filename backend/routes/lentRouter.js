const express = require('express');
const {
  getLentInfo,
  getLentOverdueInfo,
} = require('../controller/lentController');

const lentRouter = express.Router();

lentRouter.get('/', getLentInfo);

lentRouter.get('/overdue', getLentOverdueInfo);

module.exports = { lentRouter };
