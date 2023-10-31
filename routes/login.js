const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const {
  serializeUser,
  deserializeUser,
  localStrategy,
  loginGet,
  loginPost,
} = require("../controllers/authController");

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

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(localStrategy);

router.get("/login", loginGet);
router.post("/login", passport.authenticate("local"), loginPost);

module.exports = router;
