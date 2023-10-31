const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/userController");

router.get("/users", getUsers);
router.put("/users/:user_id", updateUser);
router.delete("/users/:user_id", deleteUser);
router.post("/users/register", createUser);

module.exports = router;
