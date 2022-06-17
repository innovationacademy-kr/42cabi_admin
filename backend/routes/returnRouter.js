const express = require('express');

const returnRouter = express.Router();

const { getReturn, patchReturn } = require('../controller/returnController');

returnRouter.get('/', getReturn);
returnRouter.patch('/', patchReturn);

module.exports = { returnRouter };
