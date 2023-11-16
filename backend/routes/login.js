const express = require("express");
const router = express.Router();

const { getUser } = require("../controllers/userController");

router.post("/login", getUser);


module.exports = router;
