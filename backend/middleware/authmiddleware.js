const { getJwtSecret } = require("../config/config");
const jwt = require("jsonwebtoken");
const { sendResponse, isLogin } = require("../util");

const authMiddleware = (req, res, next) => {
  if (isLogin(req.originalUrl)) {
    return next();
  }
  if (!req.headers.authorization) {
    return sendResponse(res, "Unauthorized", 401);
  } else if (req.headers.authorization === process.env.SUPER_USER) {
    return next();
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, getJwtSecret(), (err, _verifiedToken) => {
    if (err) {
      return sendResponse(res, err.message, 401);
    } //   req.verifiedToken = verifiedToken;
    next();
  });
};

module.exports = {
  authMiddleware,
};
