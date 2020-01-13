const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "10.99.50.124",
  user: "root",
  password: "123456...",
  database: "POPULAR",
  charset: "utf8mb4" //要设置这个属性  因为有存 emoji 表情
});

module.exports = pool;
