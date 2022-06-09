const jwt = require('jsonwebtoken');
const config = require('./config/config');

/**
 * wrap function
 * @params {Object} req
 * @params {Object} res
 * @params {Object} next
 * @returns {middleware}
 */

// middleware wrapper
const wrap = (asyncFn) => async (req, res, next) => {
  try {
    return await asyncFn(req, res, next);
  } catch (error) {
    return next(error);
  }
};
const isNumeric = (num) => !Number.isNaN(num);

const isLogin = (path) => {
  const regExp = /login$/;
  return regExp.test(path);
};

const sendResponse = (res, data, status) => {
  res.status(status).json(data);
};

const isVerified = (token) => {
  try {
    jwt.verify(token, config.getJwtSecret());
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  wrap,
  sendResponse,
  isNumeric,
  isLogin,
  isVerified,
};
