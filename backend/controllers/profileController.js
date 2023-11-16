const { pool } = require("../models");
const { isUserIdExisting } = require("../utils/isUserExisting");
const {fetchOrdersByUserId} = require("../utils/checkOrder");

exports.getUserById = async (req, res) => {
  const user_id = req.user.user_id;
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
  const user_id = req.user.user_id;

  try {
    if (!(await isUserIdExisting(user_id))) {
      return res.status(404).json({ message: "User does not exists" });
    }
    const orders = await fetchOrdersByUserId(user_id);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
  }
};
