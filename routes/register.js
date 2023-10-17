const { pool } = require("../db");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (existingUser.rows.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id",
        [username, email, hashedPassword]
      );
      res
        .status(201)
        .json({ message: "User registered", user_id: newUser.rows[0].user_id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  };

  router.get('/register', (req, res) => res.render('register'));
  router.post('/register', createUser);

  module.exports = router;

