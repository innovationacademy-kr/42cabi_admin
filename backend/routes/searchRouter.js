const express = require('express');
const { getSearch } = require('../controller/searchController');

const searchRouter = express.Router();

searchRouter.get('/', getSearch);

module.exports = { searchRouter };
