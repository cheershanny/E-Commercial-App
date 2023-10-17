const { pool } = require("../db");
const express = require("express");
const router = express.Router();

const getUserById = (req, res) => {
  const user_id = parseInt(req.params.user_id);
  pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getOrderById = (req, res) => {
    const user_id = parseInt(req.params.user_id);
    pool.query(
        "SELECT * FROM orders WHERE user_id = $1",
        [user_id],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).json(results.rows);
        }
      );

}

router.get("/:user_id", getUserById);
router.get("/:user_id/orders", getOrderById);

module.exports = router;
