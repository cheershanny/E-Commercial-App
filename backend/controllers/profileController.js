const { pool } = require("../models");
const { isUserIdExisting } = require("../utils/isUserExisting");

exports.getUserById = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  try {
    if (!(await isUserIdExisting(user_id))) {
      return res.status(404).json({ message: "User does not exists" });
    }
    pool.query(
      "SELECT user_id, username, email FROM users WHERE user_id = $1",
      [user_id],
      (error, results) => {
        res.status(200).json(results.rows[0]);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getOrderById = async (req, res) => {
  const user_id = parseInt(req.params.user_id);

  try {
    if (!(await isUserIdExisting(user_id))) {
      return res.status(404).json({ message: "User does not exists" });
    }
    pool.query(
      "SELECT products.product_name AS product_name,\
          orders.quantity_ordered AS quantity_ordered,\
          (orders.quantity_ordered * products.price) AS subtotal,\
          orders.order_id AS order_id\
        FROM products, orders\
        WHERE products.product_id = orders.product_id\
          AND orders.user_id = $1;",
      [user_id],
      (error, results) => {
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error(error);
  }
};
