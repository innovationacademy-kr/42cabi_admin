// 의존성없는 util 함수들

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

function sendResponse(res, data, status, code) {
  res.status(status).json({
    status: status,
    data: data,
    code: code,
  });
}
module.exports = {
  wrap,
  sendResponse,
};
