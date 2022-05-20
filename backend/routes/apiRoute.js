const express = require("express");
const apiRouter = express.Router();
const {
  getLentUserInfo,
  getUserLent,
  getCabinet,
  getInfoByCabinetNum,
  deleteLent,
  addLentLog,
  modifyCabinetActivation,
  getInfoByIntraId,
  getCabinetInfoByFloor,
} = require("./query");

const { sendResponse, isNumeric } = require("../util");

// 대여 정보(user + cabinet) 가져옴

const { lentRouter } = require("./lentRouter");
const { cabinetRouter } = require("./cabinetRouter");
const { returnRouter } = require("./returnRouter");
apiRouter.use("/lent", lentRouter);
apiRouter.use("/cabinet", cabinetRouter);
apiRouter.use("/return", returnRouter);
// apiRouter.use("/activation", activationRouter);
// apiRouter.use("/search", searchRouter);

// 사물함 고장 상태 변경
// TODO req.body로 처리
apiRouter.post("/activation", async (req, res) => {
  const { cabinetIdx, activation } = req.body;
  if (
    !cabinetIdx &&
    !activation &&
    !isNumeric(activation) &&
    !isNumeric(cabinetIdx)
  ) {
    return sendResponse(res, {}, 400);
  }
  await modifyCabinetActivation(cabinetIdx, activation);
  return sendResponse(res, "ok", 200);
});

// intra_id, cabinetNum 검색 기능
apiRouter.get("/search", async (req, res) => {
  const { intraId, cabinetNum, floor } = req.query;
  let result;

  if (intraId) {
    result = await getInfoByIntraId(intraId);
  } else if (cabinetNum && floor && isNumeric(cabinetNum) && isNumeric(floor)) {
    result = await getInfoByCabinetNum(cabinetNum, floor);
  } else {
    return sendResponse(res, {}, 400);
  }
  return sendResponse(res, result, 200);
});

// 현황탭 - 층별 사물함 정보(sum)
apiRouter.get("/cabinet/count/floor", async (_req, res) => {
  const cabientInfoByFloor = await getCabinetInfoByFloor();
  return sendResponse(res, cabientInfoByFloor, 200);
});

module.exports = { apiRouter };
