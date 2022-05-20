const express = require("express");
const app = express();
require("dotenv").config();
const { sendResponse } = require("./util");

const cors = require("cors");
const morgan = require("morgan");

app.use(express.json());
app.set("port", process.env.PORT || 8080);
app.use(cors());
app.use(morgan("dev"));

const { apiRouter } = require("./routes/apiRoute");
app.use("/api", apiRouter);

app.use((err, _req, res, _next) => {
  console.log("디비 에러");
  console.log(err);
  return sendResponse(res, 500, {});
});

app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}!`);
});
