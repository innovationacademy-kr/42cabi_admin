const express = require("express");
const apiRouter = express.Router();
const { lentRouter } = require("./lentRouter");
const { cabinetRouter } = require("./cabinetRouter");
const { returnRouter } = require("./returnRouter");
const { activationRouter } = require("./activationRouter");
const { searchRouter } = require("./searchRouter");

apiRouter.use("/lent", lentRouter);
apiRouter.use("/cabinet", cabinetRouter);
apiRouter.use("/return", returnRouter);
apiRouter.use("/activation", activationRouter);
apiRouter.use("/search", searchRouter);

module.exports = { apiRouter };
