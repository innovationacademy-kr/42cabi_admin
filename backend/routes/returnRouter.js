const express = require("express");
const query = require("./query");
const { sendResponse, isNumeric } = require("../util");
const returnRouter = express.Router();

// 특정 사물함의 정보 ( 대여중이라면: + 유저 + 렌트 정보) 가져옴
const getReturn = async (req, res) => {
  const { cabinetIdx } = req.query;

  if (!cabinetIdx && !isNumeric(cabinetIdx)) {
    return sendResponse(res, {}, 400);
  }

  const cabinetInfo = await query.getCabinet(cabinetIdx);
  if (!cabinetInfo) {
    return sendResponse(res, {}, 400);
  }
  return sendResponse(res, cabinetInfo, 200);
};

// 특정 사물함 반납 처리
const patchReturn = async (req, res) => {
  const { cabinetIdx } = req.query;

  if (!cabinetIdx && !isNumeric(cabinetIdx)) {
    return sendResponse(res, {}, 400);
  }
  // 해당 사물함의 user, lent 정보 가져옴
  const userLentInfo = await query.getUserLent(cabinetIdx);
  if (!userLentInfo) {
    return sendResponse(res, {}, 400);
  }
  await Promise.all([
    query.deleteLent(userLentInfo),
    query.addLentLog(userLentInfo),
  ]);
  return sendResponse(res, "ok", 200);
};

returnRouter.get("/", getReturn);
returnRouter.patch("/", patchReturn);

module.exports = { returnRouter };
