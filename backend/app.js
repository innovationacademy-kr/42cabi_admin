const express = require("express");
const app = express();
require("dotenv").config();

// TODO wrap 함수로 t-c 처리
const { wrap, sendResponse } = require("./util");

const {
  getInfoByIntraId,
  getInfoByCabinetNum,
  // getCabinets,
  modifyCabinetActivation,
  getUserLent,
  getCabinet,
  getLentUserInfo,
  addLentLog,
  deleteLent,
  // getNumberofCabinetByFloor,
  cabinetList,
  getCabinetInfoByFloor,
} = require("./routes/query");

/* 전체 사물함 정보
// TODO cabinetList 갱신 기준
getCabinets();
app.get("/api/cabinet", (_req, res) => {
  if (!cabinetList) {
    return sendResponse(res, {}, 400, "error");
    // res.status(400).json({ error: "No cabinet list" });
  } else {
    return sendResponse(res, cabinetList, 200, "ok");
    // res.send(cabinetList);
  }
});
*/

// 대여 정보(user + cabinet) 가져옴
app.get("/api/lent_info", async (_req, res) => {
  const lentInfo = await getLentUserInfo();
  return sendResponse(res, lentInfo, 200, "ok");
});

// 특정 사물함의 정보 ( 대여중이라면: + 유저 + 렌트 정보) 가져옴
app.get("/api/return_info", async (req, res) => {
  const { cabinetIdx } = req.query;
  if (!cabinetIdx) {
    return sendResponse(res, {}, 400, "req.query error");
  }

  const cabinetInfo = await getCabinet(cabinetIdx);
  if (!cabinetInfo) {
    return sendResponse(res, {}, 400, "error");
  }
  return sendResponse(res, cabinetInfo, 200, "ok");
});

// 특정 유저의 사물함 반납
app.patch("/api/return", async (req, res) => {
  const { cabinetIdx } = req.query;
  if (!cabinetIdx) {
    return sendResponse(res, {}, 400, "req.query error");
  }

  // 해당 사물함의 user, lent 정보 가져옴
  // TODO getUserLent api test : 완료
  const userLentInfo = await getUserLent(cabinetIdx);
  if (!userLentInfo) {
    return sendResponse(res, {}, 400, "getUserLent error");
  }
  await deleteLent(userLentInfo); // lent 테이블에서 반납 사물함 삭제
  await addLentLog(userLentInfo); // lent_log 테이블에 반납 사물함 추가

  // TODO : 슬랙메시지 발송
  return sendResponse(res, "return", 200, "ok");
});

// 사물함 고장 상태 변경
// TODO modifyCabinetActivation api 테스트 해야함 : 완료
app.post("/api/activation/:cabinetIdx/:activation", async (req, res) => {
  const { cabinetIdx, activation } = req.params;
  if (!cabinetIdx) {
    return sendResponse(res, {}, 400, "req.params error");
  }
  await modifyCabinetActivation(cabinetIdx, activation);
  return sendResponse(res, "return", 200, "ok");
});

/* 층별 사물함 수
app.get(
  "/api/cabinet/number",
  wrap(async (_req, res, _next) => {
    const content = await getNumberofCabinetByFloor();
    let ret = {};
    content.forEach((element) => {
      ret[element.floor] = Number(element.count);
    });
    return sendResponse(res, ret, 200, "ok");
  })
);
*/

// intra_id 검색 기능
app.get("/api/search", async (req, res) => {
  const { intraId, cabinetNum, floor } = req.query;
  console.log(req.query);
  console.log(intraId);
  let result;

  if (intraId) {
    result = await getInfoByIntraId(intraId);
  } else if (cabinetNum && floor) {
    result = await getInfoByCabinetNum(cabinetNum, floor);
  } else {
    return sendResponse(res, {}, 400, "req.query error");
  }
  console.log(result);
  if (!result[0]) {
    // result값이 없을 때, cabinetNum=2 and floor=6
    return sendResponse(res, {}, 400, "no data");
  }
  return sendResponse(res, result, 200, "ok");
});

// 현황탭 - 층별 사물함 정보(sum)
app.get("/api/cabinet/count/floor", async (_req, res) => {
  const cabientInfoByFloor = await getCabinetInfoByFloor();
  console.log("======cabientInfoByFloor===========");
  console.log(cabientInfoByFloor);
  if (!cabientInfoByFloor) return sendResponse(res, {}, 400, "no data");
  return sendResponse(res, cabientInfoByFloor, 200, "ok");
});

app.use((err, _req, res, _next) => {
  console.log("error middleware");
  console.log(err);
  return sendResponse(res, 500, {}, "DB error");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
