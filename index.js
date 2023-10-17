const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userDb = require('./routes/user');
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get('/users', userDb.getUsers)
app.get('/users/:user_id', userDb.getUserById)
app.post('/users', userDb.createUser)
app.put('/users/:user_id', userDb.updateUser)
app.delete('/users/:user_id', userDb.deleteUser)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

