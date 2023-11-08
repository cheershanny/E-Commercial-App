# E-Commercial-App

A comprehensive e-commerce web application with full-fledged user and order management, built with Node.js, React, Express, and PostgreSQL.


## Introduction

This project is a basic e-commerce web application that allows users to browse products, add them to their shopping cart, and make purchases. It includes user registration, authentication, and product management features. The application uses Node.js and Express for the backend, PostgreSQL as the database, Passport.js for user authentication and React for the frontend.

## Features

- User registration and secure login system.
- Extensive product catalog with detailed product descriptions.
- Real-time shopping cart management.
- Order placement with automatic total calculation.
- Viewing and managing personal order history.
- Admin features for product management (Create, Read, Update, Delete - CRUD operations).
- Real-time update of order totals after modification.
- Responsive user interface for order details, with the ability to modify orders in real-time.

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


## API Endpoints

- `/users`: User-related endpoints for account creation and management.
- `/products`: Product-related endpoints for browsing and managing the catalog.
- `/orders`: Order-related endpoints for placing and viewing orders.
- `/login`: Authentication endpoint for user login.
- `/register`: Endpoint for new user registration.
- For a detailed list of API endpoints and their descriptions, refer to the API documentation provided.

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
   4. `npm start`
   5. Access the Swagger-ui in your web browser at `http://localhost:5000/api-docs`.
#### FRONTEND
   1. `cd frontend`
   2. `npm install`
   3. `npm start`
   4. Access the react page in your web browser at `http://localhost:3000`.

## Database

The application uses PostgreSQL as the database. The database schema includes tables for users, products, orders, and order details.
![database structure](https://github.com/cheershanny/E-Commercial-App/blob/main/backend/models/db_structure.png?raw=true)

## License

This project is licensed under the MIT License.
