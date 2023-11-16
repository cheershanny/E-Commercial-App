const express = require("express");
const router = express.Router();
const {
  getUserById,
  getOrderById,
} = require("../controllers/profileController");
const { getTotal,updateQuantityOrder } = require("../controllers/orderController");
const {authenticateToken} = require('../utils/authenticateToken')

router.get("/profile", authenticateToken, getUserById);
router.get("/profile/orders",authenticateToken, getOrderById);
router.get("/profile/total", authenticateToken, getTotal);
router.patch('/profile/orders/:order_id',authenticateToken, updateQuantityOrder)

module.exports = router;
