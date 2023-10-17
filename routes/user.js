const {pool} = require('../db');

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY user_id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    const lastCol = results.rows[results.rows.length - 1];
    delete lastCol.password;
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const user_id = parseInt(request.params.user_id);
  pool.query("SELECT * FROM users WHERE user_id = $1", [user_id], (error, results) => {
    if (error) {
      throw error;
    }
    const lastCol = results.rows[results.rows.length - 1];
    delete lastCol.password;
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;
  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].user_id}`);
    }
  );
};

const updateUser = (request, response) => {
  const user_id = parseInt(request.params.user_id);
  const { name, email } = request.body;
  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE user_id = $3",
    [name, email, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${user_id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const user_id = parseInt(request.params.user_id);
  pool.query("DELETE FROM users WHERE user_id = $1", [user_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${user_id}`);
  });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }