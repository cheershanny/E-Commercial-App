const { pool } = require("../db");

async function isUsernameExisting(username) {
  const queryResult = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return queryResult.rows.length > 0;
}

async function isUserIdExisting(user_id) {
    const queryResult = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    return queryResult.rows.length > 0;
  }

module.exports = {isUsernameExisting, isUserIdExisting};