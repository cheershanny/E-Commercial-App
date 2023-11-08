const express = require("express");
const router = express.Router();
const {
  getUserById,
  getOrderById,
} = require("../controllers/profileController");
const { getTotal,updateQuantityOrder } = require("../controllers/orderController");

router.get("/:user_id", getUserById);
router.get("/:user_id/orders", getOrderById);
router.get("/:user_id/total", getTotal);
router.patch('/:user_id/orders/:order_id', updateQuantityOrder)

module.exports = router;
