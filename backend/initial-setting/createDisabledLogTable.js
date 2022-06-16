const fs = require('fs');

const pool = require('../config/database');

const schema = fs.readFileSync('../disabled-log.sql').toString('utf-8');

pool
  .query(schema)
  .then(() => {})
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    pool.end();
  });
console.log('Create Disabled Log table');
