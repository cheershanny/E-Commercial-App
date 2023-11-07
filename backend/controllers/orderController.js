const { pool } = require("../models");
const { isProductInUserOrderExisting, checkQuantityOrdered } = require("../utils/checkOrder");

exports.createOrder = async (req, res) => {
  const { user_id, product_id, price, order_date } = req.body;
  try {
    if (await isProductInUserOrderExisting(user_id, product_id)) {
      const new_quantity_ordered = await checkQuantityOrdered(user_id, product_id) + 1;
     await pool.query(
        "UPDATE orders SET quantity_ordered = $1, order_date = $2 WHERE user_id = $3 AND product_id = $4",
        [new_quantity_ordered, order_date, user_id, product_id],
        () => {
          res.status(201).json( {message: `Order updated`})
        }
      )
    } else {
      const new_quantity_ordered = 1;
     await pool.query(
        "INSERT INTO orders (user_id, product_id, quantity_ordered, order_date) VALUES ($1, $2, $3, $4)",
        [user_id, product_id, new_quantity_ordered, order_date],
        (err, results) => {
          res.status(201).json({message: `New order added`})
        } 
      )
    }
  } catch (error) {
    console.error(error);
  }
};
