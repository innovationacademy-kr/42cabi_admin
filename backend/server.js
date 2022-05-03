const express = require("express");
const mariadb = require("mariadb");
const app = express();
const cors = require("cors");
app.use(cors());

require("dotenv").config();
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

app.get("/api1", async (req, res) => {
  console.log("api1");
  let connection;
  connection = await pool.getConnection();
  const content = "SELECT * from user";

  const userData = await connection.query(content);
  connection.release();
  res.send(userData[0]);
});

app.get("/api2/:num", async (req, res) => {
  let connection;
  const num = req.params.num;
  connection = await pool.getConnection();
  const content = `insert into user values (${num},"yoyoo")`;
  await connection.query(content);
  connection.release();
  // pool.end();
  console.log("api2");

  res.send("Hello World! api2");
});

app.get("/api3", async (req, res) => {
  let connection;
  connection = await pool.getConnection();
  connection.release();
  console.log("api3");

  res.send("Hello World! api3");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
