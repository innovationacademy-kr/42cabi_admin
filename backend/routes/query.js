const pool = require('../config/database');

// 검색 BY intraId FROM lent
const getLentByIntraId = async (connection, intraId) => {
  const getLentInfoQuery = `
    SELECT u.intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, l.lent_id, l.lent_time, l.expire_time
    FROM user u
    LEFT JOIN lent l
    ON u.user_id=l.lent_user_id
    LEFT JOIN cabinet c
    ON l.lent_cabinet_id=c.cabinet_id
    WHERE u.intra_id = ?;
    `;
  const result = await connection.query(getLentInfoQuery, intraId);
  return result;
};

// 검색 BY intraId FROM lent_log
const getLentLogByIntraId = async (connection, intraId) => {
  const getLentLogInfoQuery = `
    SELECT u.intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, ll.log_id, ll.lent_time, ll.return_time
    FROM user u
    LEFT JOIN lent_log ll
    ON u.user_id=ll.log_user_id
    LEFT JOIN cabinet c
    ON ll.log_cabinet_id=c.cabinet_id
    WHERE u.intra_id = ?
    ORDER BY lent_time DESC
    LIMIT 10;
    `;
  const result = await connection.query(getLentLogInfoQuery, intraId);
  return result;
};

// 검색 BY 사물함 번호 FROM lent
const getLentByCabinetNum = async (connection, params) => {
  const content = `
    SELECT (select intra_id from user u where u.user_id=l.lent_user_id) as intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, l.lent_id, l.lent_time, l.expire_time
    FROM cabinet c
    LEFT JOIN lent l
    ON c.cabinet_id=l.lent_cabinet_id
    WHERE c.cabinet_num = ? AND c.floor = ?;
    `;
  const resultFromLent = await connection.query(content, params);
  return resultFromLent;
};

// 검색 BY 사물함 번호 FROM lent_log
const getLentLogByCabinetNum = async (connection, params) => {
  const content = `
    SELECT (select intra_id from user u where u.user_id=ll.log_user_id) as intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, ll.log_id, ll.lent_time, ll.return_time
    FROM cabinet c
    LEFT JOIN lent_log ll
    ON c.cabinet_id=ll.log_cabinet_id
    WHERE c.cabinet_num = ? AND c.floor = ?
    ORDER BY lent_time DESC
    LIMIT 10;
    `;
  const resultFromLentLog = await connection.query(content, params);
  return resultFromLentLog;
};

// 고장 사물함 리스트 조회
const getInactivatedCabinetList = async () => {
  const connection = await pool.getConnection();
  try {
    const getInactivatedCabinetQuery = `
      SELECT floor, cabinet_num
      FROM cabinet c
      WHERE c.activation=0;
      `;
    const result = await connection.query(getInactivatedCabinetQuery);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

// 사물함 activation 상태 변경
const modifyCabinetActivation = async (cabinetIdx, activation) => {
  const connection = await pool.getConnection();
  try {
    const content = `
      UPDATE cabinet c
      SET activation=${activation}
      WHERE cabinet_id=${cabinetIdx}
    `;
    await connection.query(content);
  } finally {
    connection.release();
  }
};

// 반납할 사물함의 lent 정보 가져옴
const getUserLent = async (connection, cabinetIdx) => {
  const getUserLentQuery = `
    SELECT lent_cabinet_id, lent_user_id, DATE_FORMAT(lent_time, '%Y-%m-%d %H:%i:%s') AS lent_time
    FROM lent
    WHERE lent_cabinet_id = ${cabinetIdx}
  `;
  const [result] = await connection.query(getUserLentQuery);
  return result;
};

// 특정 사물함 + (user + lent) 정보 가져옴
const getCabinet = async (cabinetIdx) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(`
        SELECT *
        FROM cabinet c
        LEFT JOIN lent l ON c.cabinet_id=l.lent_cabinet_id
        LEFT JOIN user u ON l.lent_user_id=u.user_id 
        WHERE c.cabinet_id=${cabinetIdx}
        `);
    return result;
  } finally {
    connection.release();
  }
};

// 대여 사물함(user + cabinet) 정보 가져옴
const getLentUserInfo = async () => {
  const connection = await pool.getConnection();
  try {
    const lentInfo = [];

    const content =
      'SELECT u.intra_id, l.* FROM user u RIGHT JOIN lent l ON l.lent_user_id=u.user_id';

    const lockerRentalUser = await connection.query(content);

    for (let i = 0; i < lockerRentalUser.length; i += 1) {
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
    return { lentInfo };
  } finally {
    connection.release();
  }
};

// lent_log에 반납되는 사물함 정보 추가
const addLentLog = async (connection, userLentInfo) => {
  const addLentLogQuery = `
    INSERT INTO lent_log(log_cabinet_id, log_user_id, lent_time, return_time) 
    VALUES (${userLentInfo.lent_cabinet_id}, ${userLentInfo.lent_user_id}, '${userLentInfo.lent_time}', now())
    `;
  await connection.query(addLentLogQuery);
};

// lent 테이블에서 사물함 정보 삭제
const deleteLent = async (connection, userLentInfo) => {
  const deleteLentQuery = `
    DELETE 
    FROM lent 
    WHERE lent_cabinet_id=${userLentInfo.lent_cabinet_id}
    `;
  await connection.query(deleteLentQuery);
};

const getLentOverdue = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const content = `
		SELECT u.intra_id, c.floor, c.cabinet_num, l.lent_time,l.expire_time from lent l
	  JOIN cabinet c
		ON c.cabinet_id = l.lent_cabinet_id
		JOIN user u
		ON u.user_id = l.lent_user_id
		where l.expire_time < DATE_FORMAT(NOW(), '%Y-%m-%d')
		ORDER BY l.expire_time;
		`;
    const result = await connection.query(content);
    return result;
  } finally {
    // catch (err) {
    //    throw err;
    //  }
    connection.release();
  }
};

// 현황탭 층별 사물함 정보(sum)
const getCabinetInfoByFloor = async () => {
  const connection = await pool.getConnection();
  try {
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
    return result;
  } finally {
    // catch (err) {
    //    throw err;
    //  }
    connection.release();
  }
};

module.exports = {
  getLentByIntraId,
  getLentLogByIntraId,
  getLentByCabinetNum,
  getLentLogByCabinetNum,
  modifyCabinetActivation,
  getInactivatedCabinetList,
  getUserLent,
  getCabinet,
  getLentUserInfo,
  addLentLog,
  deleteLent,
  getLentOverdue,
  getCabinetInfoByFloor,
};
