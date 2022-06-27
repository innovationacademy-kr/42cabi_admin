const express = require('express');

const activationRouter = express.Router();
const {
  getInactivatedCabinet,
  patchActivation,
  getBanCabinet,
} = require('../controller/activationController');

activationRouter.get('/', getInactivatedCabinet);
activationRouter.patch('/', patchActivation);
activationRouter.get('/ban', getBanCabinet);

module.exports = { activationRouter };
