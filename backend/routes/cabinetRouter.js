const express = require("express");
const { sendResponse } = require("../util");
const { getCabinetInfoByFloor } = require("./query");

const cabinetRouter = express.Router();

// 층별 사물함 현황(sum)
const getCabinetCountFloor = async (_req, res) => {
  const cabientInfoByFloor = await getCabinetInfoByFloor();
  return sendResponse(res, cabientInfoByFloor, 200);
};

cabinetRouter.get("/count/floor", getCabinetCountFloor);

module.exports = { cabinetRouter };
