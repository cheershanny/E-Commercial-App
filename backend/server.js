const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const serverPort = 5000;
const clientPort = 3000;

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/register");
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
server.use(cors({
  origin: `http://localhost:${clientPort}`,
  credentials: true
}));

const store = new session.MemoryStore();

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
    sameSite: "none",
    store,
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser());

server.get("/", (req, res) => {
  res.send("Hello, Express!");
});
server.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: {
      user_id: req.user.user_id,
      username: req.user.username,
      email: req.user.email,
    } });
    
  } else {
    res.json({ isAuthenticated: false });
  }
});

server.use(
  "/",
  loginRoutes,
  userRoutes,
  productRoutes,
  logoutRoutes,
  profileRoutes
);

server.listen(serverPort, () => {
  console.log(`Server is running on http://localhost:${serverPort}`);
  console.log(`Swagger-ui is available on http://localhost:${serverPort}/api-docs`);
});
