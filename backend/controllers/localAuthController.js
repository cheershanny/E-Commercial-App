const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LocalStrategy = require("passport-local").Strategy;

const dotenv = require("dotenv");
dotenv.config();

const { pool } = require("../models");

exports.serializeUser = (user, done) => {
  done(null, user.user_id);
};

exports.deserializeUser = async (user_id, done) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    if (user.rows.length === 0) {
      return done(null, false);
    }
    done(null, user.rows[0]);
  } catch (error) {
    done(error);
  }
};

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (user.rows.length === 0) {
      return done(null, false, { message: "User not found" });
    }
    const hashedPassword = user.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      return done(null, user.rows[0] );
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (error) {
    return done(error);
  }
});


exports.loginUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign(
        { user_id: req.user.user_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
   
    res.cookie("token", token, {
      httpOnly: true, 
      secure: true, 
      sameSite: "Strict", 
    });

    res.json({
      user_id: req.user.user_id,
      username: req.user.username,
      email: req.user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
