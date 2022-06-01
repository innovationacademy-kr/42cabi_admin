const express = require("express");

const lentRouter = express.Router();
const { getLentUserInfo, getLentOverdue } = require("./query");
const { sendResponse } = require("../util");

const getLentInfo = async (_req, res) => {
  const lentInfo = await getLentUserInfo();

  return sendResponse(res, lentInfo, 200);
};

const getLentOverdueInfo = async (_req, res) => {
  const overdueInfo = await getLentOverdue();

  return sendResponse(res, overdueInfo, 200);
};

lentRouter.get("/", getLentInfo);

lentRouter.get("/overdue", getLentOverdueInfo);

module.exports = { lentRouter };
