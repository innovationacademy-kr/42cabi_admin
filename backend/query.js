const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.STUDY_DATABASE,
});

const getCabinet = async (cabinetIdx) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const [result] = await connection.query(
      `
      SELECT *
      FROM cabinet c
      LEFT JOIN lent l ON c.cabinet_id=l.lent_cabinet_id
      LEFT JOIN user u ON l.lent_user_id=u.user_id 
      WHERE c.cabinet_id=${cabinetIdx}
      `
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    connection.release();
  }
};
