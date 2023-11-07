const { pool } = require("../models");
const query = "SELECT * FROM orders WHERE user_id = $1 AND product_id = $2"

async function isProductInUserOrderExisting(user_id, product_id) {
  const queryResult = await pool.query(
    query,
    [user_id, product_id]
  );
  return queryResult.rows.length > 0;
}

async function checkQuantityOrdered(user_id, product_id) {
  const queryResult = await pool.query(
    query,
    [user_id, product_id]
  );
  return queryResult.rows[0].quantity_ordered;
}
module.exports = { isProductInUserOrderExisting, checkQuantityOrdered };
