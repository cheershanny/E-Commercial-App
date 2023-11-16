const express = require("express");
const router = express.Router();
const passport = require("passport");

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

passport.use(googleStrategy);
passport.use(facebookStrategy);

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