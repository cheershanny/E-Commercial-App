const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
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

server.use("/", loginRoutes, userRoutes, registerRoutes, productRoutes);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
