const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const {
  serializeUser,
  deserializeUser,
  localStrategy,
  googleStrategy,
  loginUser,
  facebookStrategy,
} = require("../controllers/authController");
const { requestGoogle } = require("../controllers/request");

const store = new session.MemoryStore();

router.use(
  session({
    secret: "f4z4gs$Gcg2323fe",
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false,
    sameSite: "none",
    store,
  })
);

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(localStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  loginUser
);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }),
  requestGoogle
);


router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" })
);

router.post("/auth/facebook", passport.authenticate("facebook"));

module.exports = router;
