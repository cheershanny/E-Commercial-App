const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const productDb = require("./routes/product");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");

const port = 3000;

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.get("/", (req, res) => {
  res.send("Hello, Express!");
});

server.use("/", loginRoutes, userRoutes, registerRoutes);

server.get("/products", productDb.getProducts);
server.get("/products/:product_id", productDb.getProductById);
server.post("/products", productDb.createProduct);
server.put("/products/:product_id", productDb.updateProduct);
server.delete("/products/:product_id", productDb.deleteProduct);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
