const { getJwtSecret } = require("../config/config");
const jwt = require("jsonwebtoken");
const { sendResponse, isLogin } = require("../util");

const authMiddleware = (req, res, next) => {
  if (isLogin(req.originalUrl)) {
    return next();
  }
  const token = req.headers.authorization;

  jwt.verify(token, getJwtSecret(), (err, _verifiedToken) => {
    if (err) {
      return sendResponse(res, err.message, 401);
    } else {
      //   req.verifiedToken = verifiedToken;
      next();
    }
  });
};

module.exports = {
  authMiddleware,
};
