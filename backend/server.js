const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const loginRoutes = require("./routes/login");
const profileRoutes = require("./routes/profile");

const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocument = yaml.load("api.yaml");
server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(cors());

server.get("/", (req, res) => {
  res.send("Hello, Express!");
});

server.use("/", loginRoutes, userRoutes, productRoutes);
server.use("/profile", profileRoutes);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger-ui is available on http://localhost:${port}/api-docs`);
});
