const { pool } = require("../models");
const bcrypt = require("bcrypt");
const {
  isUserIdExisting,
  isUsernameExisting,
  isUserEmailExisting
} = require("../utils/isUserExisting");

exports.getUsers = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT user_id, username,email FROM users ORDER BY user_id ASC"
    );
    res.json(users.rows);
  } catch (error) {
    console.error(error);
  }
};

exports.createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (await isUsernameExisting(username)) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (await isUserEmailExisting(email)) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id",
      [username, email, hashedPassword]
    );
    req.login(newUser.rows[0], (err) => {
      if (err) {
        return next(err);
      }
      res.json(newUser.rows[0]);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const { username, email, password } = req.body;
  try {
    if (!(await isUserIdExisting(user_id))) {
      return res.status(404).send("User does not exists");
    }

    await pool.query(
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4",
      [username, email, password, user_id]
    );

    res.status(200).send(`User modified with ID: ${user_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
};
exports.deleteUser = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  try {
    if (!(await isUserIdExisting(user_id))) {
      return res.status(404).send("User does not exists");
    }
    await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);

    res.status(200).send(`User deleted with ID: ${user_id}`);
  } catch (error) {
    console.error(error);
  }
};
