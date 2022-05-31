/**
 * wrap function
 * @params {Object} req
 * @params {Object} res
 * @params {Object} next
 * @returns {middleware}
 */

// middleware wrapper
const wrap = (asyncFn) => {
  return async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

const isNumeric = (num) => {
  return !isNaN(num);
};

const isLogin = (path) => {
  const regExp = /login$/;
  console.log(regExp.test(path));
  return regExp.test(path);
};

const sendResponse = (res, data, status) => {
  res.status(status).json(data);
};

module.exports = {
  wrap,
  sendResponse,
  isNumeric,
  isLogin,
};
