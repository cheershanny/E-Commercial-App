const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { pool } = require("../db");
const session = require("express-session");

const store = new session.MemoryStore();

router.use(
  session({
    secret: "f4z4gs$Gcg2323fe",
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false,
    store,
  })
);

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
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
  });

passport.use(
  new LocalStrategy(async (username, password, done) => {
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
  })
);



router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/profile/:user_id");
  }
);


module.exports = router;
