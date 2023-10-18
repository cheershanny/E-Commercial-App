const { pool } = require("../db");
const express = require("express");
const {
  isProductIdExisting,
  isProductNameExisting,
} = require("../utils/isProductExisting");

const router = express.Router();

const getProducts = (req, res) => {
  try {
    pool.query(
      "SELECT * FROM products ORDER BY product_id ASC",
      (error, results) => {
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const getProductById = async (req, res) => {
  const product_id = parseInt(req.params.product_id);
  try {
    if (!(await isProductIdExisting(product_id))) {
      return res.status(404).json({ message: "Product does not exist" });
    }
    pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [product_id],
      (error, results) => {
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const createProduct = async (req, res) => {
  const { product_name, description, price, quantity_available } = req.body;
  if (await isProductNameExisting(product_name)) {
    return res.status(409).json({message: "Product already exists"});
  }
  try {
    pool.query(
      "INSERT INTO products (product_name, description, price, quantity_available) VALUES ($1, $2, $3, $4) RETURNING *",
      [product_name, description, price, quantity_available],
      (error, results) => {
        res
          .status(201)
          .send(`Product added with ID: ${results.rows[0].product_id}`);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (req, res) => {
  const product_id = parseInt(req.params.product_id);
  const { product_name, description, price, quantity_available } = req.body;
  try {
    if (!(await isProductIdExisting(product_id))) {
      return res.status(404).json({ message: "Product does not exist" });
    }
    pool.query(
      "UPDATE products SET product_name = $1, description = $2, price = $3, quantity_available = $4 WHERE product_id = $5",
      [product_name, description, price, quantity_available, product_id],
      (error, results) => {
        res.status(200).send(`Product modified with ID: ${product_id}`);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (req, res) => {
  const product_id = parseInt(req.params.product_id);
  try {
    if (!(await isProductIdExisting(product_id))) {
      return res.status(404).json({ message: "Product does not exist" });
    }
    pool.query(
      "DELETE FROM products WHERE product_id = $1",
      [product_id],
      (error, results) => {
        res.status(200).send(`Product deleted with ID: ${product_id}`);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

router.get("/products", getProducts);
router.get("/products/:product_id", getProductById);
router.post("/products", createProduct);
router.put("/products/:product_id", updateProduct);
router.delete("/products/:product_id", deleteProduct);

module.exports = router;
