# E-Commercial-App
A simple e-commerce web application built with Node.js, Express, and PostgreSQL.

## Introduction

This project is a basic e-commerce web application that allows users to browse products, add them to their shopping cart, and make purchases. It includes user registration, authentication, and product management features. The application uses Node.js and Express for the backend, PostgreSQL as the database, and Passport.js for user authentication.

## Features

- User registration and login
- Browse products
- Add products to the shopping cart
- Checkout and make purchases
- Product management (CRUD operations)

## Usage
- Register a new user account.
- Log in with your account.
- Browse available products.
- Manage products by reading, adding, updating, or deleting them.

## Technologies Used
- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A minimalist web framework for building web applications in Node.js.
- **PostgreSQL**: An open-source relational database management system.
- **Passport.js**: A popular authentication middleware for Node.js.
- **Bcrypt**: A library for securely hashing and comparing passwords.
- **Express-Session**: Middleware for managing user sessions.

## API Endpoints
- /users: User-related endpoints (CRUD operations).
- /products: Product-related endpoints (CRUD operations).
- /login: Login and authentication endpoints.
- /register: create new user.
For a complete list of API endpoints and their descriptions, refer to the API documentation.

## Installation

1. Clone this repository:
   `git clone https://github.com/cheershanny/e-commerce-app.git`
2. Change to the project directory:
    `cd e-commerce-app`
3. Install the dependencies:
    `npm install`
4. Create a PostgreSQL database and set up the connection details in the .env file.
5. Run the application:
    `npm start`
6. Access the application in your web browser at `http://localhost:3000`.

## Database
The application uses PostgreSQL as the database. The database schema includes tables for users, products, orders, and order details. Refer to the database design and schema in the project documentation.
![database structure](https://github.com/cheershanny/E-Commercial-App/blob/main/db/db_structure.png?raw=true)


## License
This project is licensed under the MIT License.

