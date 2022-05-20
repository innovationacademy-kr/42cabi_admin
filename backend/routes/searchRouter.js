const express = require("express");
const query = require("./query");
const { isNumeric, sendResponse } = require("../util");
const searchRouter = express.Router();

// // intra_id, cabinetNum 검색 기능
const getSearch = async (req, res) => {
  const { intraId, cabinetNum, floor } = req.query;
  let result;

  if (intraId) {
    result = await query.getInfoByIntraId(intraId);
  } else if (cabinetNum && floor && isNumeric(cabinetNum) && isNumeric(floor)) {
    result = await query.getInfoByCabinetNum(cabinetNum, floor);
  } else {
    return sendResponse(res, {}, 400);
  }
  return sendResponse(res, result, 200);
};

searchRouter.get("/", getSearch);

module.exports = { searchRouter };
