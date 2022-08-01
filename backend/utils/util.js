const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * wrap function
 * @params {Object} req
 * @params {Object} res
 * @params {Object} next
 * @returns {middleware}
 */

const wrap = (asyncFn) => async (req, res, next) => {
  try {
    return await asyncFn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const isNumeric = (n) => {
  const regExp = /^\d+$/;
  return regExp.test(n);
};
const isLogin = (path) => {
  const regExp = /login$/;
  return regExp.test(path);
};

const sendResponse = (res, data, status) => {
  res.status(status).json(data);
};

const isString = (str) => {
  const regExp = /^[a-zA-Z0-9-]+$/;
  return regExp.test(str);
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
  isString,
};
