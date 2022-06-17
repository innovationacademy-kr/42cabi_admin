const express = require('express');

const activationRouter = express.Router();
const {
  getInactivatedCabinet,
  patchActivation,
} = require('../controller/activationController');

activationRouter.get('/', getInactivatedCabinet);
activationRouter.patch('/', patchActivation);

module.exports = { activationRouter };
