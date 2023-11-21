# E-Commercial-App

A simple e-commerce web application with basic user and order management, built with Node.js, React, Express, and PostgreSQL.


## Introduction

This project allows users to browse products and add them to their shopping cart. It includes user registration, authentication, and product management features. The application uses Node.js and Express for the backend, PostgreSQL as the database, Passport.js for user authentication and React for the frontend.

## Features

- User registration and secure login system.
- Product catalog presents in homepage
- Real-time shopping cart management.
- Order placement with automatic total calculation and real-time update of order totals after modification.
- Viewing and managing order.

## Usage

1. Create a new user account or log in with an existing account.
2. Explore the product catalog and add items to your shopping cart.
3. Review your cart, make adjustments, and place your order.
4. View detailed order history and manage your orders.

## Technologies Used

- **Node.js** and **Express.js**: for creating the server-side of the application.
- **PostgreSQL**: as the relational database to store user and product data.
- **React**: for building the dynamic frontend.
- **Passport.js**: for secure authentication.
- **Bcrypt**: for password hashing.
- **Express-Session**: for handling user sessions.
- **Fetch API**: for making asynchronous requests to the server from the frontend.

## Installation

### Clone this repository:
   `git clone https://github.com/cheershanny/e-commerce-app.git`
### Change to the project directory:
   `cd e-commerce-app`
### Run backend and frontend on 2 separated terminals
#### BACKEND
   1. `cd backend`
   2. `npm install`
   3. Create a PostgreSQL database and set up the connection details in the .env file.
      `DB_PASSWORD = [your_password]
      USER=[your_user_name]
      HOST=[your_host]
      DATABASE=[your_chosen_name]
      DB_PORT=[your_chosen_port]`
   4. Add your secret in the .env file
      `JWT_SECRET=[your_chosen_secret]
      SESSION_SECRET=[your_chosen_secret]
      NODE_ENV='development'`
   5. `npm start`
#### FRONTEND
   1. `cd client`
   2. `npm install`
   3. `npm start`
   4. Access the react page in your web browser at `http://localhost:3000`.

## API Endpoints
Access the Swagger-ui in your web browser at `http://localhost:5000/api-docs`.

## Database

The application uses PostgreSQL as the database. The database schema includes tables for users, products, orders, and order details.
![database structure](https://github.com/cheershanny/E-Commercial-App/blob/main/backend/models/db_structure.png?raw=true)

