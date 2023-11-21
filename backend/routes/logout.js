const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
    req.session.destroy(() => {
        res.clearCookie('connect.sid'); 
        res.redirect('/');
      });
    });
})

module.exports = router;

