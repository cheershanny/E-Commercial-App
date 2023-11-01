const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const {
  serializeUser,
  deserializeUser,
  localStrategy,
  googleStrategy,
  loginPost,
  facebookStrategy,
} = require("../controllers/authController");

const store = new session.MemoryStore();

router.use(
  session({
    secret: "f4z4gs$Gcg2323fe",
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false,
    sameSite: 'none',
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
  passport.authenticate("local", { failureRedirect: "/login" }),
  loginPost
);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ['https://www.googleapis.com/auth/plus.login'] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect(`/profile/${req.user.user_id}`); 
  }
);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  loginPost
);

module.exports = router;

// 