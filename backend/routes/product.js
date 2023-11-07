const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { createOrder } = require("../controllers/orderController");

router.get("/products", getProducts);
router.get("/products/:product_id", getProductById);
router.post("/products", createProduct);
router.put("/products/:product_id", updateProduct);
router.delete("/products/:product_id", deleteProduct);

router.post("/add_order/:product_id", createOrder);

module.exports = router;
