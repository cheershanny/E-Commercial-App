const express = require("express");
const router = express.Router();
const { getUserById, getOrderById } = require("../controllers/profileController");

router.get("/:user_id", getUserById);
router.get("/:user_id/orders", getOrderById);

module.exports = router;
