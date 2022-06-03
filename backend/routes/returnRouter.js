const express = require('express');
const query = require('../db/query');
const { sendResponse, isNumeric } = require('../util');
const pool = require('../config/database');

const returnRouter = express.Router();

// 특정 사물함의 정보 ( 대여중이라면: + 유저 + 렌트 정보) 가져옴
const getReturn = async (req, res) => {
  const { cabinetIdx } = req.query;

  if (!cabinetIdx && !isNumeric(cabinetIdx)) {
    return sendResponse(res, {}, 400);
  }

  const connection = await pool.getConnection();
  try {
    const cabinetInfo = await query.getCabinet(connection, cabinetIdx);
    if (!cabinetInfo) {
      return sendResponse(res, {}, 400);
    }
    return sendResponse(res, cabinetInfo, 200);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};

// 특정 사물함 반납 처리
const patchReturn = async (req, res) => {
  const { cabinetIdx } = req.query;
  if (!cabinetIdx && !isNumeric(cabinetIdx)) {
    return sendResponse(res, {}, 400);
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 해당 사물함의 user, lent 정보 가져옴
    const userLentInfo = await query.getUserLent(connection, cabinetIdx);
    if (!userLentInfo) {
      return sendResponse(res, {}, 400);
    }

    await Promise.all([
      query.deleteLent(connection, userLentInfo), // lent 테이블에서 해당 사물함의 대여 정보 삭제
      query.addLentLog(connection, userLentInfo), // lent_log에 반납되는 사물함 정보 추가
    ]);

    await connection.commit();
    return sendResponse(res, 'ok', 200);
  } catch (err) {
    await connection.rollback();
    return sendResponse(res, {}, 500);
  } finally {
    connection.release();
  }
};

returnRouter.get('/', getReturn);
returnRouter.patch('/', patchReturn);

module.exports = { returnRouter };
