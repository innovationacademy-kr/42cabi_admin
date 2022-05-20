const express = require("express");
const cabinetRouter = express.Router();
const { sendResponse } = require("../util");
const { getCabinetInfoByFloor } = require("./query");

const getCabinet = async (_req, res) => {
  const cabientInfoByFloor = await getCabinetInfoByFloor();
  return sendResponse(res, cabientInfoByFloor, 200);
};

cabinetRouter.get("/count/floor", getCabinet);

module.exports = { cabinetRouter };
