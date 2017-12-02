const {Pool} = require('pg');
const config = {
  host: process.env['DATABASE_URL'] || 'localhost',
  user: process.env['DATABASE_USER'] || 'postgres',
  password: process.env['DATABASE_PASSWORD'] || 'postgres',
  database: process.env['DATABASE_NAME'] || 'hacksantos',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
let pool;

module.exports = function () {
  if (pool == undefined) {
    pool = new Pool(config);
  }
  return pool;
}();