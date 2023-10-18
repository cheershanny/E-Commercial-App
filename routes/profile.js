const { pool } = require("../db");
const express = require("express");
const router = express.Router();
const { isUserIdExisting } = require("../utils/isUserExisting");

const getUserById = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  try {
    if (!(await isUserIdExisting(user_id))) {
      return res.status(404).json({ message: "User does not exists" });
    }
    pool.query(
      "SELECT user_id, username, email FROM users WHERE user_id = $1",
      [user_id],
      (error, results) => {
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const getOrderById = async (req, res) => {
  const user_id = parseInt(req.params.user_id);

  try {
    if (!(await isUserIdExisting(user_id))) {
      return res.status(404).json({ message: "User does not exists" });
    }
    pool.query(
      "SELECT orders.order_date as date,\
        products.product_name as product_name,\
        order_details.quantity_ordered as quantity_ordered,\
        order_details.subtotal as subtotal\
        FROM orders, order_details, products WHERE order_details.order_id = orders.order_id\
        AND order_details.product_id = products.product_id\
        AND orders.user_id = $1",
      [user_id],
      (error, results) => {
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

router.get("/:user_id", getUserById);
router.get("/:user_id/orders", getOrderById);

module.exports = router;
