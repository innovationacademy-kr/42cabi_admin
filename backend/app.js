const express = require("express");
const app = express();
const mariadb = require("mariadb");

require("dotenv").config();
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

let cabinetList = {
  location: [],
  floor: [],
  section: [],
  cabinet: [],
};

// git test
// test용 주석

function sendResponse(res, data, status, code) {
  res.status(status).json({
    status: status,
    data: data,
    code: code,
  });
}

// 전체 사물함 정보 가져옴
async function getCabinets() {
  let connection;
  try {
    connection = await pool.getConnection();

    const content1 = `SELECT DISTINCT cabinet.location FROM cabinet`;
    const result1 = await connection.query(content1);
    result1.forEach(async (element1) => {
      let floorList = [];
      let tmpSectionlist = [];
      let tmpCabinetList = [];

      cabinetList.location.push(element1.location);

      const content2 = `SELECT DISTINCT cabinet.floor FROM cabinet WHERE location='${element1.location}' order by floor`;
      const result2 = await connection.query(content2);
      result2.forEach(async (element2) => {
        let sectionList = [];
        cabinetList = [];

        floorList.push(element2.floor);

        const content3 = `SELECT DISTINCT cabinet.section FROM cabinet WHERE location='${element1.location}' and floor='${element2.floor}'`;
        const result3 = await connection.query(content3);
        result3.forEach(async (element3) => {
          let cabinet = [];
          sectionList.push(element3.section);

          // content4 쿼리에서 activation==1인 경우만 모아야 하나?
          const content4 = `SELECT * FROM cabinet WHERE location='${element1.location}' AND floor='${element2.floor}' AND section='${element3.section}' AND activation=1 order by cabinet_num`;
          const result4 = await connection.query(content4);
          result4.forEach(async (element4) => {
            cabinet.push(element4);
          });
          cabinetList.push(cabinet);
        });
        tmpSectionlist.push(sectionList);
        tmpCabinetList.push(cabinetList);
      });
      cabinetList.floor?.push(floorList);
      cabinetList.section?.push(tmpSectionlist);
      cabinetList.cabinet?.push(tmpCabinetList);
    });
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
}

async function getLentUserInfo() {
  let connection;
  try {
    // TODO DB error가 주요 에러인데, 이 함수를 wrap함수로 묶어서 에러처리를 한번에 해야할지..
    let lentInfo = [];

    const content =
      "SELECT u.intra_id, l.* FROM user u RIGHT JOIN lent l ON l.lent_user_id=u.user_id";

    connection = await pool.getConnection();
    const lockerRentalUser = await connection.query(content);

    for (let i = 0; i < lockerRentalUser.length; i++) {
      lentInfo.push({
        lent_id: lockerRentalUser[i].lent_id,
        lent_cabinet_id: lockerRentalUser[i].lent_cabinet_id,
        lent_user_id: lockerRentalUser[i].lent_user_id,
        lent_time: lockerRentalUser[i].lent_time,
        expire_time: lockerRentalUser[i].expire_time,
        extension: lockerRentalUser[i].extension,
        intra_id: lockerRentalUser[i].intra_id,
      });
    }
    return { lentInfo: lentInfo };
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
}

// 특정 사물함 + (user + lent) 정보 가져옴
async function getCabinet(connection, cabinetIdx) {
  const [result] = await connection.query(
    `
      SELECT *
      FROM cabinet c
      LEFT JOIN lent l ON c.cabinet_id=l.lent_cabinet_id
      LEFT JOIN user u ON l.lent_user_id=u.user_id 
      WHERE c.cabinet_id=${cabinetIdx}
      `
  );
  return result;
}

// 반납할 사물함의 lent 정보 가져옴
async function getUserLent(connection, cabinetIdx) {
  const [result] = await connection.query(
    `
    SELECT lent_cabinet_id, lent_user_id, DATE_FORMAT(lent_time, '%Y-%m-%d %H:%i:%s') AS lent_time
    FROM lent
    WHERE lent_cabinet_id = ${cabinetIdx}
    `
  );
  return result;
}

// lent 테이블에서 사물함 정보 삭제
async function deleteLent(connection, userLentInfo) {
  await connection.query(
    `
    DELETE 
    FROM lent 
    WHERE lent_cabinet_id=${userLentInfo.lent_cabinet_id}
    `
  );
}

// lent_log에 반납되는 사물함 정보 추가
async function addLentLog(connection, userLentInfo) {
  await connection.query(
    `
    INSERT INTO lent_log(log_cabinet_id, log_user_id, lent_time, return_time) 
    VALUES (${userLentInfo.lent_cabinet_id}, ${userLentInfo.lent_user_id}, '${userLentInfo.lent_time}', now())
    `
  );
}

// 사물함 activation 상태 변경
async function modifyCabinetActivation(connection, cabinetIdx, activation) {
  const content = `
  UPDATE cabinet c
  SET activation=${activation}
  WHERE cabinet_id=${cabinetIdx}
  `;
  await connection.query(content);
}

// 전체 사물함 정보
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

app.get("/api/lent_info", async (_req, res) => {
  const lentInfo = await getLentUserInfo();
  return sendResponse(res, lentInfo, 200, "ok");
});

// 특정 사물함의 정보 ( 대여중이라면: + 유저 + 렌트 정보) 가져옴
app.get("/api/return_info", async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();
    const { cabinetIdx } = req.query;
    if (!cabinetIdx) {
      return sendResponse(res, {}, 400, "req.query error");
    }

    const cabinetInfo = await getCabinet(cabinetIdx);
    if (!cabinetInfo) {
      return sendResponse(res, {}, 400, "error");
    }
    return sendResponse(res, cabinetInfo, 200, "ok");
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
});

// 특정 유저의 사물함 반납
app.patch("/api/return", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const { cabinetIdx } = req.query;
    if (!cabinetIdx) {
      return sendResponse(res, {}, 400, "req.query error");
    }

    // 해당 사물함의 user, lent 정보 가져옴
    const userLentInfo = await getUserLent(connection, cabinetIdx);
    if (!userLentInfo) {
      return sendResponse(res, {}, 400, "getUserLent error");
    }
    await deleteLent(connection, userLentInfo); // lent 테이블에서 반납 사물함 삭제
    await addLentLog(connection, userLentInfo); // lent_log 테이블에 반납 사물함 추가

    // TODO : 슬랙메시지 발송
    return sendResponse(res, "return", 200, "ok");
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
});

// 사물함 고장 상태 변경
app.post("/api/activation/:cabinetIdx/:activation", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log(`----req.params------: ${req.params.activation}`);
    const { cabinetIdx, activation } = req.params;
    if (!cabinetIdx) {
      return sendResponse(res, {}, 400, "req.params error");
    }
    await modifyCabinetActivation(connection, cabinetIdx, activation);
    return sendResponse(res, "return", 200, "ok");
  } catch (err) {
  } finally {
    connection.release();
  }
});

// 층별 사물함 수
app.get("/api/cabinet/number", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const content = await connection.query(
      `select c.floor, count(*) as count from cabinet c group by c.floor`
    );

    let ret = {};
    content.forEach((element) => {
      ret[element.floor] = Number(element.count);
    });
    return sendResponse(res, ret, 200, "ok");
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
