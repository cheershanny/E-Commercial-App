const { pool } = require("../db");

async function isProductNameExisting(product_name) {
  const queryResult = await pool.query(
    "SELECT * FROM products WHERE product_name = $1",
    [product_name]
  );
  return queryResult.rows.length > 0;
}

async function isProductIdExisting(product_id) {
    const queryResult = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [product_id]
    );
    return queryResult.rows.length > 0;
  }

module.exports = {isProductNameExisting, isProductIdExisting};