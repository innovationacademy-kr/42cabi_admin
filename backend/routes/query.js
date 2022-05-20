// DB에 종속되는 util함수들

const mariadb = require("mariadb");
require("dotenv").config({ path: "../.env" });

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  bigIntAsNumber: true,
});

// 검색 by intraId
exports.getInfoByIntraId = async (intraId) => {
  let connection;
  try {
    // TODO l.expire_time => expire_time?
    connection = await pool.getConnection();
    const getInfoFromLentQuery = `
      SELECT u.intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, l.lent_id, l.lent_time, l.expire_time
      FROM user u
      LEFT JOIN lent l
      ON u.user_id=l.lent_user_id
      LEFT JOIN cabinet c
      ON l.lent_cabinet_id=c.cabinet_id
      WHERE u.intra_id='${intraId}';
      `;
    const getInfoFromLentLogQuery = `
      SELECT u.intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, ll.log_id, ll.lent_time, ll.return_time
      FROM user u
      LEFT JOIN lent_log ll
      ON u.user_id=ll.log_user_id
      LEFT JOIN cabinet c
      ON ll.log_cabinet_id=c.cabinet_id
      WHERE u.intra_id='${intraId}'
      ORDER BY lent_time DESC
      LIMIT 10;
      `;
    const resultFromLent = await connection.query(getInfoFromLentQuery);
    const resultFromLentLog = await connection.query(getInfoFromLentLogQuery);
    // console.log("=====searchIntraId=====");
    const result = {
      resultFromLent: resultFromLent,
      resultFromLentLog: resultFromLentLog,
    };
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

// 검색 by 사물함 번호
exports.getInfoByCabinetNum = async (cabinetNum, floor) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const getInfoByCabinetNumFromLentQuery = `
      SELECT (select intra_id from user u where u.user_id=l.lent_user_id) as intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, l.lent_id, l.lent_time, l.expire_time
      FROM cabinet c
      LEFT JOIN lent l
      ON c.cabinet_id=l.lent_cabinet_id
      WHERE c.cabinet_num=${cabinetNum} AND c.floor=${floor};
      `;
    const getInfoByCabinetNumFromLentLogQuery = `
      SELECT (select intra_id from user u where u.user_id=ll.log_user_id) as intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, ll.log_id, ll.lent_time, ll.return_time
      FROM cabinet c
      LEFT JOIN lent_log ll
      ON c.cabinet_id=ll.log_cabinet_id
      WHERE c.cabinet_num=${cabinetNum} AND c.floor=${floor}
      ORDER BY lent_time DESC
      LIMIT 10;
      `;
    const resultFromLent = await connection.query(
      getInfoByCabinetNumFromLentQuery
    );
    const resultFromLentLog = await connection.query(
      getInfoByCabinetNumFromLentLogQuery
    );
    const result = {
      resultFromLent: resultFromLent,
      resultFromLentLog: resultFromLentLog,
    };
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

// 사물함 activation 상태 변경
exports.modifyCabinetActivation = async (cabinetIdx, activation) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const content = `
      UPDATE cabinet c
      SET activation=${activation}
      WHERE cabinet_id=${cabinetIdx}
    `;
    await connection.query(content);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

// 반납할 사물함의 lent 정보 가져옴
exports.getUserLent = async (cabinetIdx) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(`
      SELECT lent_cabinet_id, lent_user_id, DATE_FORMAT(lent_time, '%Y-%m-%d %H:%i:%s') AS lent_time
      FROM lent
      WHERE lent_cabinet_id = ${cabinetIdx}
      `);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

// 특정 사물함 + (user + lent) 정보 가져옴
exports.getCabinet = async (cabinetIdx) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(`
        SELECT *
        FROM cabinet c
        LEFT JOIN lent l ON c.cabinet_id=l.lent_cabinet_id
        LEFT JOIN user u ON l.lent_user_id=u.user_id 
        WHERE c.cabinet_id=${cabinetIdx}
        `);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

// 대여 사물함(user + cabinet) 정보 가져옴
exports.getLentUserInfo = async () => {
  let connection;
  try {
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
};

// lent_log에 반납되는 사물함 정보 추가
exports.addLentLog = async (userLentInfo) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(`
      INSERT INTO lent_log(log_cabinet_id, log_user_id, lent_time, return_time) 
      VALUES (${userLentInfo.lent_cabinet_id}, ${userLentInfo.lent_user_id}, '${userLentInfo.lent_time}', now())
      `);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

// lent 테이블에서 사물함 정보 삭제
exports.deleteLent = async (userLentInfo) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(`
      DELETE 
      FROM lent 
      WHERE lent_cabinet_id=${userLentInfo.lent_cabinet_id}
    `);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

// 현황탭 층별 사물함 정보(sum)
exports.getCabinetInfoByFloor = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const content = `
      SELECT c.floor,
      COUNT(*) as total,
      COUNT(case when c.cabinet_id=l.lent_cabinet_id and l.expire_time>now() then 1 end) as used,
      COUNT(case when l.expire_time<now() then 1 end) as overdue,
      COUNT(case when l.lent_cabinet_id is null and c.activation=1 then 1 end) as unused,
      COUNT(case when c.activation=0 then 1 end) as disabled
      FROM cabinet c
      LEFT JOIN lent l
      ON c.cabinet_id=l.lent_cabinet_id
      group by floor;
    `;
    const result = await connection.query(content);
    console.log("------getCabinetInfoByFloor------");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};
