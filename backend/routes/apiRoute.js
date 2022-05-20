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
apiRouter.use("/lent", lentRouter);
apiRouter.use("/cabinet", cabinetRouter);
apiRouter.use("/return", returnRouter);
apiRouter.use("/activation", activationRouter);
apiRouter.use("/search", searchRouter);

// apiRouter.get("/lent", async (_req, res) => {
//   const lentInfo = await getLentUserInfo();
//   return sendResponse(res, lentInfo, 200);
// });

// 특정 사물함의 정보 ( 대여중이라면: + 유저 + 렌트 정보) 가져옴
apiRouter
  .route("/return")
  .get(async (req, res) => {
    const { cabinetIdx } = req.query;

    if (!cabinetIdx && !isNumeric(cabinetIdx)) {
      return sendResponse(res, {}, 400);
    }

    const cabinetInfo = await getCabinet(cabinetIdx);
    if (!cabinetInfo) {
      return sendResponse(res, {}, 400);
    }
    return sendResponse(res, cabinetInfo, 200);
  })
  .patch(async (req, res) => {
    const { cabinetIdx } = req.query;
    if (!cabinetIdx && !isNumeric(cabinetIdx)) {
      return sendResponse(res, {}, 400);
    }

    // 해당 사물함의 user, lent 정보 가져옴
    const userLentInfo = await getUserLent(cabinetIdx);
    if (!userLentInfo) {
      return sendResponse(res, {}, 400);
    }
    await Promise.all([deleteLent(userLentInfo), addLentLog(userLentInfo)]);
    // await deleteLent(userLentInfo); // lent 테이블에서 반납 사물함 삭제
    // await addLentLog(userLentInfo); // lent_log 테이블에 반납 사물함 추가

    // TODO : 슬랙메시지 발송
    return sendResponse(res, "ok", 200);
  });

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
