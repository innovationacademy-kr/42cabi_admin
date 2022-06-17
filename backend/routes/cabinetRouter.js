const express = require('express');
const { getCabinetCountFloor } = require('../controller/cabinetController');

const cabinetRouter = express.Router();

cabinetRouter.get('/count/floor', getCabinetCountFloor);

module.exports = { cabinetRouter };
