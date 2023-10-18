const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const path = require("path"); 

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const profileRoutes = require("./routes/profile");

const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocument = yaml.load('api.yaml');
server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const port = 3000;

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

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
server.use("/profile", profileRoutes);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(
    `Swagger-ui is available on http://localhost:${port}/api-docs`
  );
});
