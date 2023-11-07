const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  serializeUser,
  deserializeUser,
  localStrategy,
  googleStrategy,
  loginUser,
  facebookStrategy,
} = require("../controllers/authController");

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(localStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
      if (!user) {
          return res.status(401).json({ message: info.message || "User does not exist." });
      }
      req.logIn(user, (err) => {
          if (err) {
              return next(err);
          }
          return loginUser(req, res);
      });
  })(req, res, next);
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
      res.redirect(`/profile/${req.body.user_id}`);
  }
);

router.get("/auth/facebook", passport.authenticate("facebook"));

module.exports = router;
