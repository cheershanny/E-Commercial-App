const Pool = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: "localhost",
  database: "ecommerce",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = { pool };