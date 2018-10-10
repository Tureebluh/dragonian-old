import mysql from 'mysql';

const dbpool  = mysql.createPool({
  host: process.env.DRAGONIAN_DB_HOST,
  user: process.env.DRAGONIAN_DB_USER,
  password: process.env.DRAGONIAN_DB_PASS,
  database : process.env.DRAGONIAN_DB_DB,
  bigNumberStrings: true,
  supportBigNumbers: true
});

export default dbpool;