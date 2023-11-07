const express = require("express");
const router = express.Router();
const {
  getUserById,
  getOrderById,
} = require("../controllers/profileController");
const { getTotal } = require("../controllers/orderController");

router.get("/:user_id", getUserById);
router.get("/:user_id/orders", getOrderById);
router.get("/:user_id/total", getTotal);

module.exports = router;
