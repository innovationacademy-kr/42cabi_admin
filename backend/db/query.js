// 검색 BY intraId FROM lent
const getLentByIntraId = async (connection, intraId) => {
  const getLentInfoQuery = `
    SELECT u.intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, l.lent_id, l.lent_time, l.expire_time
    FROM user u
    LEFT JOIN lent l
    ON u.user_id=l.lent_user_id
    LEFT JOIN cabinet c
    ON l.lent_cabinet_id=c.cabinet_id
    WHERE u.intra_id = ? ;
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
const getLentByCabinetNum = async (connection, cabinetNum, floor) => {
  const content = `
    SELECT (select intra_id from user u where u.user_id=l.lent_user_id) as intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, l.lent_id, l.lent_time, l.expire_time
    FROM cabinet c
    LEFT JOIN lent l
    ON c.cabinet_id=l.lent_cabinet_id
    WHERE c.cabinet_num = ? AND c.floor = ?;
    `;
  const resultFromLent = await connection.query(content, [cabinetNum, floor]);
  return resultFromLent;
};

// 검색 BY 사물함 번호 FROM lent_log
const getLentLogByCabinetNum = async (connection, cabinetNum, floor) => {
  const content = `
    SELECT (select intra_id from user u where u.user_id=ll.log_user_id) as intra_id, c.cabinet_id, c.cabinet_num, c.location, c.section, c.floor, c.activation, ll.log_id, ll.lent_time, ll.return_time
    FROM cabinet c
    LEFT JOIN lent_log ll
    ON c.cabinet_id=ll.log_cabinet_id
    WHERE c.cabinet_num = ? AND c.floor = ?
    ORDER BY lent_time DESC
    LIMIT 10;
    `;
  const resultFromLentLog = await connection.query(content, [
    cabinetNum,
    floor,
  ]);
  return resultFromLentLog;
};

// 고장 사물함 리스트 조회
const getInactivatedCabinetList = async (connection) => {
  const getInactivatedCabinetQuery = `
    SELECT c.floor, c.cabinet_num, d.note
    FROM cabinet c
    JOIN disable d
    ON d.disable_cabinet_id = c.cabinet_id AND d.status = 1
    WHERE c.activation=0;
    `;
  const result = await connection.query(getInactivatedCabinetQuery);
  return result;
};

// 사물함 activation 상태 변경
const modifyCabinetActivation = async (connection, cabinetIdx, activation) => {
  const content = `
    UPDATE cabinet c
    SET activation= ?
    WHERE cabinet_id= ?
    `;
  await connection.query(content, [activation, cabinetIdx]);
};

// 고장 사물함 log 추가
const addDisablelog = async (connection, cabinetIdx, note) => {
  const content = `
    INSERT INTO disable (disable_cabinet_id, note)
    VALUES (?, ?);
    `;
  await connection.query(content, [cabinetIdx, note]);
};

// 고장 사물함 status 0 처리
const modifyDisablelog = async (connection, cabinetIdx) => {
  const content = `
    UPDATE disable d
    SET status=0, fix_time=now()
    WHERE disable_cabinet_id = ? AND status=1;
  `;
  await connection.query(content, cabinetIdx);
};

// 반납할 사물함의 lent 정보 가져옴
const getUserLent = async (connection, cabinetIdx) => {
  const getUserLentQuery = `
    SELECT lent_cabinet_id, lent_user_id, DATE_FORMAT(lent_time, '%Y-%m-%d %H:%i:%s') AS lent_time
    FROM lent
    WHERE lent_cabinet_id = ?
    `;
  const [result] = await connection.query(getUserLentQuery, cabinetIdx);
  return result;
};

// 특정 사물함 + (user + lent) 정보 가져옴
const getCabinet = async (connection, cabinetIdx) => {
  const getCabinetQuery = `
    SELECT *
    FROM cabinet c
    LEFT JOIN lent l ON c.cabinet_id=l.lent_cabinet_id
    LEFT JOIN user u ON l.lent_user_id=u.user_id 
    WHERE c.cabinet_id = ?;
    `;
  const [result] = await connection.query(getCabinetQuery, cabinetIdx);
  return result;
};

// 대여 사물함(user + cabinet) 정보 가져옴
const getLentUserInfo = async (connection) => {
  const lentInfo = [];

  const content = `SELECT u.intra_id, l.*
    FROM user u
    RIGHT JOIN lent l
    ON l.lent_user_id=u.user_id
    `;

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
};

// lent_log에 반납되는 사물함 정보 추가
const addLentLog = async (connection, userLentInfo) => {
  const addLentLogQuery = `
    INSERT INTO lent_log(log_cabinet_id, log_user_id, lent_time, return_time) 
    VALUES ( ?, ?, ?, now())
    `;
  await connection.query(addLentLogQuery, userLentInfo);
};

// lent 테이블에서 사물함 정보 삭제
const deleteLent = async (connection, userLentInfo) => {
  const deleteLentQuery = `
    DELETE 
    FROM lent 
    WHERE lent_cabinet_id= ?
    `;
  await connection.query(deleteLentQuery, userLentInfo.lent_cabinet_id);
};

const getLentOverdue = async (connection) => {
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
};

// 현황탭 층별 사물함 정보(sum)
const getCabinetInfoByFloor = async (connection) => {
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
};

// ban 사물함 정보
const getBanCabinetList = async (connection) => {
  const content = `
    SELECT c.floor, c.cabinet_num, c.section, (SELECT intra_id FROM user u WHERE u.user_id=ll.log_user_id) as intra_id, ll.return_time
    FROM cabinet c
    JOIN lent_log ll
    ON ll.log_cabinet_id = c.cabinet_id AND c.activation=2;
    `;
  const result = await connection.query(content);
  return result;
};

const getBanUser = async (connection) => {
  const content = `SELECT u.intra_id, b.bannedDate FROM user u join ban b on b.user_id=u.user_id where u.auth=2;
`;
  const result = await connection.query(content);
  return result;
};

module.exports = {
  getLentByIntraId,
  getLentLogByIntraId,
  getLentByCabinetNum,
  getLentLogByCabinetNum,
  modifyCabinetActivation,
  addDisablelog,
  modifyDisablelog,
  getInactivatedCabinetList,
  getUserLent,
  getCabinet,
  getLentUserInfo,
  addLentLog,
  deleteLent,
  getLentOverdue,
  getCabinetInfoByFloor,
  getBanCabinetList,
  getBanUser,
};
