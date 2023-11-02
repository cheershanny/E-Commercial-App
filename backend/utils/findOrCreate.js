const { pool } = require("../models");

async function findOrCreate(provider, provider_id, profile) {
  try {
    const queryResult = await pool.query(
      "SELECT user_id FROM auth_methods WHERE provider = $1 AND provider_id = $2",
      [provider, provider_id]
    );

    if (queryResult.rows.length > 0) {
      const user_id = queryResult.rows[0].user_id;
      const userResult = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
      return userResult.rows[0];
    } 

    const newUserResult = await pool.query(
      "INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *",
      [profile.emails[0].value, profile.displayName]
    );

    const newUser = newUserResult.rows[0];

    await pool.query(
      "INSERT INTO auth_methods (user_id, provider, provider_id) VALUES ($1, $2, $3)",
      [newUser.user_id, provider, provider_id]
    );

    return newUser;

  } catch (error) {
    console.error("Error in findOrCreate:", error);
    throw error;
  }
}

module.exports = { findOrCreate };
