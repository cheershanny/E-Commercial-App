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

passport.deserializeUser((user_id, done) => {
  const user = req.session.passport.user;
  done(null, user);
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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect(`/profile/${user.user_id}`);
    });
  })(req, res, next);
});

module.exports = router;
