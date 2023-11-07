const { pool } = require("../models");
const {
  isProductInUserOrderExisting,
  checkQuantityOrdered,
} = require("../utils/checkOrder");
const { isUserIdExisting } = require("../utils/isUserExisting");

exports.createOrder = async (req, res) => {
  const { user_id, product_id, order_date } = req.body;
  try {
    if (await isProductInUserOrderExisting(user_id, product_id)) {
      const new_quantity_ordered =
        (await checkQuantityOrdered(user_id, product_id)) + 1;
      pool.query(
        "UPDATE orders SET quantity_ordered = $1, order_date = $2 WHERE user_id = $3 AND product_id = $4",
        [new_quantity_ordered, order_date, user_id, product_id],
        () => {
          res.status(201).json({ message: `Order updated` });
        }
      );
    } else {
      const new_quantity_ordered = 1;
      pool.query(
        "INSERT INTO orders (user_id, product_id, quantity_ordered, order_date) VALUES ($1, $2, $3, $4)",
        [user_id, product_id, new_quantity_ordered, order_date],
        (err, results) => {
          res.status(201).json({ message: `New order added` });
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getTotal = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  if (!(await isUserIdExisting(user_id))) {
    return res.status(404).json({ message: "User does not exists" });
  }
  pool.query(
    "SELECT SUM(orders.quantity_ordered*products.price) as total\
    FROM orders, products\
    WHERE orders.product_id = products.product_id \
    AND orders.user_id =$1;",
    [user_id],
    (error, results) => {
      res.status(200).json(results.rows);
    }
  );
};
