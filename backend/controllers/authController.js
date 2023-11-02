const passport = require("passport");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const dotenv = require("dotenv");
dotenv.config();

const { pool } = require("../models");
const { findOrCreate } = require("../utils/findOrCreate");
const { isUsernameExisting } = require("../utils/isUserExisting");

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
      return done(null, user.rows[0]);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (error) {
    return done(error);
  }
});

exports.googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await findOrCreate("google", profile.id, profile);
      return cb(null, user);
    } catch (error) {
      console.error("Error in GoogleStrategy:", error);
      return cb(error);
    }
  }
);

exports.facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await findOrCreate("facebook", profile.id, profile);
      return cb(null, user);
    } catch (error) {
      console.error("Error in FacebookStrategy:", error);
      return cb(error);
    }
  }
);

exports.loginUser = async (req, res) => {
  try {
    if (!(await isUsernameExisting(req.user.username))) {
      return res.status(404).json({ message: "User does not exist" });
    }
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
