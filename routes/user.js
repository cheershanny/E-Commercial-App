const { pool } = require("../db");
const express = require("express");
const router = express.Router();
const { isUserIdExisting } = require("../utils/isUserExisting");

const getUsers = (req, res) => {
  try {
    pool.query(
      "SELECT user_id, username,email FROM users ORDER BY user_id ASC",
      (error, results) => {
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const { username, email, password } = req.body;
  try {
    if (!(await isUserIdExisting(user_id))) {
      return res.status(204).json({ message: "User does not exists" });
    }
    await pool.query(
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4",
      [username, email, password, user_id]
    );

    res.status(200).send(`User modified with ID: ${user_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  try {
    if (!(await isUserIdExisting(user_id))) {
      return res.status(204).json({ message: "User does not exists" });
    }
    await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);

    res.status(200).send(`User deleted with ID: ${user_id}`);
  } catch (error) {
    console.error(error);
  }
};

router.get("/users", getUsers);
router.put("/users/:user_id", updateUser);
router.delete("/users/:user_id", deleteUser);

module.exports = router;
