const express = require("express");
const mariadb = require("mariadb");
const app = express();

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
  pool.end();
  res.send(userData);
});

app.get("/api2", async (req, res) => {
  let connection;
  connection = await pool.getConnection();
  pool.end();
  console.log("api2");

  res.send("Hello World! api2");
});

app.get("/api3", async (req, res) => {
  let connection;
  connection = await pool.getConnection();
  pool.end();
  console.log("api3");

  res.send("Hello World! api3");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
