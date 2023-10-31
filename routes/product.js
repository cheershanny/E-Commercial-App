const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/products", getProducts);
router.get("/products/:product_id", getProductById);
router.post("/products", createProduct);
router.put("/products/:product_id", updateProduct);
router.delete("/products/:product_id", deleteProduct);

module.exports = router;
