const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const port = 5000;

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const loginRoutes = require("./routes/login");
const profileRoutes = require("./routes/profile");
const logoutRoutes = require("./routes/logout");

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

const store = new session.MemoryStore();

server.use(
  session({
    secret: "f4z4gs$Gcg2323fe",
    cookie: {
      secure: process.env.NODE_ENV === 'production', 
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000 
    },
    saveUninitialized: false,
    resave: false,
    sameSite: "none",
    store,
  })
);
server.use(passport.initialize());
server.use(passport.session());


server.get("/", (req, res) => {
  res.send("Hello, Express!");
});

server.use("/", loginRoutes, userRoutes, productRoutes, logoutRoutes);
server.use("/profile", profileRoutes);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger-ui is available on http://localhost:${port}/api-docs`);
});
