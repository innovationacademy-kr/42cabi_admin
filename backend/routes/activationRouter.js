const express = require("express");
const query = require("./query");
const { sendResponse, isNumeric } = require("../util");

const activationRouter = express.Router();

// 고장 사물함 리스트 조회
const getInactivatedCabinet = async (_req, res) => {
  const cabinetList = await query.getInactivatedCabinetList();
  return sendResponse(res, cabinetList, 200);
};

const postActivation = async (req, res) => {
  const { cabinetIdx, activation } = req.body;
  if (
    !cabinetIdx &&
    !activation &&
    !isNumeric(activation) &&
    !isNumeric(cabinetIdx)
  ) {
    return sendResponse(res, {}, 400);
  }
  await query.modifyCabinetActivation(cabinetIdx, activation);
  return sendResponse(res, "ok", 200);
};

activationRouter.get("/", getInactivatedCabinet);
activationRouter.post("/", postActivation);

module.exports = { activationRouter };
