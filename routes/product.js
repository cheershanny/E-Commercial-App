const { pool } = require("../db");

// products (
//   product_id SERIAL PRIMARY KEY,
//   product_name VARCHAR(100) NOT NULL,
//   description TEXT,
//   price DECIMAL(10, 2) NOT NULL,
//   quantity_available INT NOT NULL
// );

const getProducts = (req, res) => {
  pool.query(
    "SELECT * FROM products ORDER BY product_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getProductById = (req, res) => {
  const product_id = parseInt(req.params.product_id);
  pool.query(
    "SELECT * FROM products WHERE product_id = $1",
    [product_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const createProduct = (req, res) => {
  const { product_name, description, price, quantity_available } =
    req.body;
  pool.query(
    "INSERT INTO products (product_name, description, price, quantity_available) VALUES ($1, $2, $3, $4) RETURNING *",
    [product_name, description, price, quantity_available],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .send(`Product added with ID: ${results.rows[0].product_id}`);
    }
  );
};

const updateProduct = (req, res) => {
  const product_id = parseInt(req.params.product_id);
  const { product_name, description, price, quantity_available } =
    req.body;
  pool.query(
    "UPDATE products SET product_name = $1, description = $2, price = $3, quantity_available = $4 WHERE product_id = $5",
    [product_name, description, price, quantity_available, product_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Product modified with ID: ${product_id}`);
    }
  );
};

const deleteProduct = (req, res) => {
  const product_id = parseInt(req.params.product_id);
  pool.query(
    "DELETE FROM products WHERE product_id = $1",
    [product_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with ID: ${product_id}`);
    }
  );
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
