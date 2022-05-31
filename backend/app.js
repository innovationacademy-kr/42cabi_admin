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
const { authMiddleware } = require("./middleware/authmiddleware");
app.use("/api", authMiddleware, apiRouter);

app.use((err, _req, res, _next) => {
  console.log(err);
  return sendResponse(res, 500, {});
});

app.listen(app.get("port"), () => {
  console.log(`listening on port ${app.get("port")}!`);
});
