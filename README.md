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

## API Endpoints
- /users: User-related endpoints (CRUD operations).
- /products: Product-related endpoints (CRUD operations).
- /login: Login and authentication endpoints.
- /register: create new user.
For a complete list of API endpoints and their descriptions, refer to the API documentation.

## Authentication
This project uses Passport.js for user authentication. User passwords are hashed and stored securely in the database. Sessions are managed for user login and authentication. Custom middleware is used to protect certain routes from unauthorized access.

## Database
The application uses PostgreSQL as the database. The database schema includes tables for users, products, orders, and order details. Refer to the database design and schema in the project documentation.
![database structure](https://github.com/cheershanny/E-Commercial-App/blob/main/db/db_structure.png?raw=true)


