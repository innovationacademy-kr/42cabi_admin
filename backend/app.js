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

let cabinetList;

function sendResponse(res, data, status, code) {
  res.status(status).json({
    status: status,
    data: data,
    code: code,
  });
}

async function getLentUserInfo(res) {
  try {
    // TODO DB error가 주요 에러인데, 이 함수를 wrap함수로 묶어서 에러처리를 한번에 해야할지..
    let connection;
    let lentInfo = [];

    const content =
      "SELECT u.intra_id, l.* FROM user u RIGHT JOIN lent l ON l.lent_user_id=u.user_id";

    // 자체 ORM
    connection = await pool.getConnection();
    const lockerRentalUser = await connection.query(content);
    pool.end();

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
    console.log(lentInfo);
    return { lentInfo: lentInfo };
  } catch (err) {
    console.log(err);
    throw err;
    return sendResponse(res, {}, 400, "error");
  }
  // await pool
  //   .query(content)
  //   .then((res) => {
  //     for (let i = 0; i < res.length; i++) {
  //       lentInfo.push({
  //         lent_id: res[i].lent_id,
  //         lent_cabinet_id: res[i].lent_cabinet_id,
  //         lent_user_id: res[i].lent_user_id,
  //         lent_time: res[i].lent_time,
  //         expire_time: res[i].expire_time,
  //         extension: res[i].extension,
  //         intra_id: res[i].intra_id,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     throw err;
  //   });
  // if (pool) pool.end();
  // return { lentInfo: lentInfo };
}

app.get("/api/cabinet", (_req, res) => {
  if (!cabinetList) {
    return sendResponse(res, {}, 400, "error");
    // res.status(400).json({ error: "No cabinet list" });
  } else {
    return sendResponse(res, cabinetList, 200, "ok");
    // res.send(cabinetList);
  }
});

app.get("/api/lent_info", async (req, res) => {
  const lentInfo = await getLentUserInfo(res);
  return sendResponse(res, lentInfo, 200, "ok");
  // return res.json(lentInfo);
  // return sendResponse(res, getLentUser(res), 200, "ok");
});

// app.get("/", async (req, res) => {
//   console.log("=========");
//   console.log(req.res.cookie);
//   console.log(res.cookie);
//   // await req.res.cookie("acc", 50);
//   return res.send("listen on 3000!");
// });

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
