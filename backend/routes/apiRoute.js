const express = require("express");

const apiRouter = express.Router();
const { lentRouter } = require("./lentRouter");
const { cabinetRouter } = require("./cabinetRouter");
const { returnRouter } = require("./returnRouter");
const { activationRouter } = require("./activationRouter");
const { searchRouter } = require("./searchRouter");
const { authRouter } = require("./authRouter");

apiRouter.use("/lent", lentRouter);
apiRouter.use("/cabinet", cabinetRouter);
apiRouter.use("/return", returnRouter);
apiRouter.use("/activation", activationRouter);
apiRouter.use("/search", searchRouter);
apiRouter.use("/auth", authRouter);

module.exports = { apiRouter };
