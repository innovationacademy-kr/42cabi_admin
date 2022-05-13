// DB에 종속되는 util함수들

const mariadb = require("mariadb");

// 해당 부분 DB를 옮겨야할지..
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  bigIntAsNumber: true,
});

let cabinetList = {
  location: [],
  floor: [],
  section: [],
  cabinet: [],
};

async function getInfoByIntraId(intraId) {
  let connection;
  try {
    connection = await pool.getConnection();
    const content = `
    SELECT u.intra_id, c.location, c.section, c.floor, c.cabinet_num, l.lent_time, l.expire_time
    FROM user u
    JOIN lent l
    ON u.user_id=l.lent_user_id
    JOIN cabinet c
    ON l.lent_cabinet_id=c.cabinet_id
    WHERE u.intra_id='${intraId}'
    union
    SELECT u.intra_id, c.location, c.section, c.floor, c.cabinet_num, ll.lent_time, ll.return_time as expire_time
    FROM user u
    JOIN lent_log ll
    ON u.user_id=ll.log_user_id
    JOIN cabinet c
    ON ll.log_cabinet_id=c.cabinet_id
    WHERE u.intra_id='${intraId}'
    ORDER BY lent_time DESC;
    `;
    const result = await connection.query(content);
    console.log("=====searchIntraId=====");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
}

async function getInfoByCabinetNum(cabinetNum, floor) {
  let connection;
  try {
    connection = await pool.getConnection();
    const content = `
    SELECT c.cabinet_id, c.cabinet_num, c.floor, c.activation, (SELECT u.intra_id FROM user u WHERE ll.log_user_id=u.user_id) as intra_id, ll.lent_time, ll.return_time
    FROM cabinet c
    JOIN lent_log ll
    ON c.cabinet_id=ll.log_cabinet_id
    WHERE c.cabinet_num=${cabinetNum} AND c.floor=${floor}
    union
    SELECT c.cabinet_id, c.cabinet_num, c.floor, c.activation, (SELECT u.intra_id FROM user u WHERE l.lent_user_id=u.user_id) as intra_id, l.lent_time, l.expire_time as return_time
    FROM cabinet c
    JOIN lent l
    ON c.cabinet_id=l.lent_cabinet_id
    WHERE c.cabinet_num=${cabinetNum} AND c.floor=${floor}
    ORDER BY return_time DESC;
    `;
    const result = await connection.query(content);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
}

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
        let cabinetInfo = [];

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
          cabinetInfo.push(cabinet);
        });
        tmpSectionlist.push(sectionList);
        tmpCabinetList.push(cabinetInfo);
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

// 사물함 activation 상태 변경
async function modifyCabinetActivation(cabinetIdx, activation) {
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
}
// 반납할 사물함의 lent 정보 가져옴
async function getUserLent(cabinetIdx) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(
      `
    SELECT lent_cabinet_id, lent_user_id, DATE_FORMAT(lent_time, '%Y-%m-%d %H:%i:%s') AS lent_time
    FROM lent
    WHERE lent_cabinet_id = ${cabinetIdx}
    `
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
}
// 특정 사물함 + (user + lent) 정보 가져옴
async function getCabinet(cabinetIdx) {
  let connection;
  try {
    connection = await pool.getConnection();
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
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
}
// 전체 사물함 정보 가져옴

async function getLentUserInfo() {
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
}
// lent_log에 반납되는 사물함 정보 추가
async function addLentLog(userLentInfo) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(
      `
      INSERT INTO lent_log(log_cabinet_id, log_user_id, lent_time, return_time) 
      VALUES (${userLentInfo.lent_cabinet_id}, ${userLentInfo.lent_user_id}, '${userLentInfo.lent_time}', now())
      `
    );
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
}

// lent 테이블에서 사물함 정보 삭제
async function deleteLent(userLentInfo) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(
      `
    DELETE 
    FROM lent 
    WHERE lent_cabinet_id=${userLentInfo.lent_cabinet_id}
    `
    );
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
}

// 현황탭 층별 사물함 정보(sum)
async function getCabinetInfoByFloor() {
  let connection;
  try {
    connection = await pool.getConnection();
    const content = `
    SELECT c.floor,
    count(*) as total,
    count(case when c.cabinet_id=l.lent_cabinet_id then 1 end) as used,
    count(case when l.expire_time<now() then 1 end) as overdue,
    count(case when c.activation=0 then 1 end) as disabled
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
}

// async function getNumberofCabinetByFloor() {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     const content = await connection.query(
//       `select c.floor, count(*) as count from cabinet c
//       left join lent l
//       on l.lent_cabinet_id=c.cabinet_id
//       group by c.floor`
//     );
//     console.log(`content: ${content}`);
//     return content;
//   } catch (err) {
//     throw err;
//   } finally {
//     connection.release();
//   }
// }

module.exports = {
  getInfoByIntraId,
  getInfoByCabinetNum,
  getCabinets,
  modifyCabinetActivation,
  getUserLent,
  getCabinet,
  getLentUserInfo,
  addLentLog,
  deleteLent,
  // getNumberofCabinetByFloor,
  cabinetList,
  getCabinetInfoByFloor,
};
