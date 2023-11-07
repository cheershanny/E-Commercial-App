const { pool } = require("../models");

exports.createOrder = async (req, res) => {
  const { user_id, product_id, price, order_date } = req.body;

  try {
    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, order_date) VALUES ($1, $2) RETURNING *",
      [user_id, order_date]
    );
    if (orderResult.rows.length) {
      const order_id = orderResult.rows[0].order_id;
      const orderDetailsResult = await pool.query(
        "INSERT INTO order_details (order_id, product_id, quantity_ordered, subtotal) VALUES ($1, $2, $3, $4) RETURNING *",
        [order_id, product_id, 1, price]
      );
      res.status(201).json({
        order: orderResult.rows[0],
        orderDetails: orderDetailsResult.rows[0],
      });
    } else {
        res.status(400).send('Order creation failed.');
      }
  
  } catch (error) {
    console.error(error);
  }
};
