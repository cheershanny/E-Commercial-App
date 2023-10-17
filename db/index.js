const Pool = require("pg").Pool;
const pool = new Pool({
  user: "em",
  host: "localhost",
  database: "ecommerce",
  password: "1212",
  port: 5432,
});

module.exports = { pool };