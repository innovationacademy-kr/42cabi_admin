const express = require('express');
const { postLogin } = require('../controller/authController');

const authRouter = express.Router();

authRouter.post('/login', postLogin);

module.exports = { authRouter };
