const { sendResponse, isLogin, isVerified } = require('../utils/util');

const authMiddleware = (req, res, next) => {
  if (isLogin(req.originalUrl)) {
    return next();
  }
  if (!req.headers.authorization) {
    return sendResponse(res, 'Unauthorized', 401);
  } else if (req.headers.authorization === process.env.SUPER_USER) {
    return next();
  }
  const token = req.headers.authorization.split(' ')[1];

  if (!isVerified(token)) {
    return sendResponse(res, 'Unauthorized', 401);
  }
  return next();
};

module.exports = {
  authMiddleware,
};
