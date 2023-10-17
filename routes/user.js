const { pool } = require("../db");
const express = require("express");
const router = express.Router();

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY user_id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    const lastCol = results.rows[results.rows.length - 1];
    delete lastCol.password;
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const user_id = parseInt(req.params.user_id);
  pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      const lastCol = results.rows[results.rows.length - 1];
      delete lastCol.password;
      res.status(200).json(results.rows);
    }
  );
};

const updateUser = (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const { username, email, password } = req.body;
  pool.query(
    "UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4",
    [username, email, password, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${user_id}`);
    }
  );
};

const deleteUser = (req, res) => {
  const user_id = parseInt(req.params.user_id);
  pool.query(
    "DELETE FROM users WHERE user_id = $1",
    [user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with ID: ${user_id}`);
    }
  );
};

router.get("/users", getUsers);
router.put("/users/:user_id", updateUser);
router.delete("/users/:user_id", deleteUser);

module.exports = router;
