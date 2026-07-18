# MERN Authentication Project

This project is a full-stack authentication system built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides user registration, login, and authentication functionalities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Dependencies](#dependencies)
- [Badges](#badges)

## Features

- User registration with email and password.
- User login with email and password.
- JSON Web Token (JWT) based authentication.
- Protected routes for authenticated users.
- User profile management.
- Secure password hashing.

## Technologies Used

**Frontend:**

- React
- Vite
- React Router DOM
- Axios
- Formik & Yup
- Bootstrap & React Bootstrap
- React Icons

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt.js
- Dotenv
- Express-Rate-Limit
- Express-Validator
- CORS
- Nodemailer
- Prettier

## Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/mern-auth.git
    cd mern-auth
    ```

2.  **Backend Setup:**

    Navigate to the `api` directory and install dependencies:

    ```bash
    cd api
    npm install
    ```

    Create a `.env` file in the `api` directory and add the following environment variables:

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

    Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., from MongoDB Atlas) and `your_jwt_secret_key` with a strong, random string.

    Start the backend server:

    ```bash
    npm start
    ```

    The backend server will run on `http://localhost:3000`.

3.  **Frontend Setup:**

    Navigate to the `client` directory and install dependencies:

    ```bash
    cd ../client
    npm install

    ```
