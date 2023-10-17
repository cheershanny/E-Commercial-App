const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const userDb = require('./routes/user');
const productDb = require('./routes/product');
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

server.get('/users', userDb.getUsers)
server.get('/users/:user_id', userDb.getUserById)
server.post('/users', userDb.createUser)
server.put('/users/:user_id', userDb.updateUser)
server.delete('/users/:user_id', userDb.deleteUser)

server.get('/products', productDb.getProducts)
server.get('/products/:product_id', productDb.getProductById)
server.post('/products', productDb.createProduct)
server.put('/products/:product_id', productDb.updateProduct)
server.delete('/products/:product_id', productDb.deleteProduct)

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

