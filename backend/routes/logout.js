const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
    req.session.destroy(() => {
        res.clearCookie('connect.sid'); 
        res.redirect('/');
      });
})

module.exports = router;

