const express = require("express");
const { getLentUserInfo } = require("./query");
const { sendResponse } = require("../util");
const lentRouter = express.Router();

const getLentInfo = async (_req, res) => {
  const lentInfo = await getLentUserInfo();
  return sendResponse(res, lentInfo, 200);
};

lentRouter.get("/", getLentInfo);

module.exports = { lentRouter };
