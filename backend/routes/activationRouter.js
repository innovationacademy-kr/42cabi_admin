const express = require("express");
const query = require("./query");
const { sendResponse, isNumeric } = require("../util");
const activationRouter = express.Router();

const postActivation = async (req, res) => {
  const { cabinetIdx, activation } = req.body;
  if (
    !cabinetIdx &&
    !activation &&
    !isNumeric(activation) &&
    !isNumeric(cabinetIdx)
  ) {
    return sendResponse(res, {}, 400);
  }
  await query.modifyCabinetActivation(cabinetIdx, activation);
  return sendResponse(res, "ok", 200);
};

activationRouter.post("/", postActivation);

module.exports = { activationRouter };
