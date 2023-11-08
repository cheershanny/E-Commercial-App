const { pool } = require("../models");

async function checkQuantityByUserAndProduct(user_id, product_id) {
  const queryResult = await pool.query(
    "SELECT * FROM orders WHERE user_id = $1 AND product_id = $2",
    [user_id, product_id]
  );
  if (queryResult.rows.length > 0) {
    return queryResult.rows[0].quantity_ordered;
  } else {
    return null;
  }
}

async function checkQuantityByOrderId(order_id) {
  const queryResult = await pool.query(
    "SELECT * FROM orders WHERE order_id = $1",
    [order_id]
  );
  return queryResult.rows[0].quantity_ordered;
}
async function fetchOrdersByUserId(user_id) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT products.product_name AS product_name,
              orders.quantity_ordered AS quantity_ordered,
              (orders.quantity_ordered * products.price) AS subtotal,
              orders.order_id AS order_id
       FROM products, orders
       WHERE products.product_id = orders.product_id
         AND orders.user_id = $1;`,
      [user_id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.rows);
      }
    );
  });
}
module.exports = { checkQuantityByUserAndProduct,checkQuantityByOrderId, fetchOrdersByUserId };
