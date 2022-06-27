const express = require('express');
const { postLogin } = require('../controller/authController');
const { getBanUser } = require('../controller/authController');

const authRouter = express.Router();

authRouter.post('/login', postLogin);
authRouter.get('/ban', getBanUser);

module.exports = { authRouter };
