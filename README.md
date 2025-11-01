# GoldBit Backend API

GoldBit is a backend API built with Node.js, designed to help users allocate their savings into Bitcoin and Gold with smart features and real-time data.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [License](#license)

---

## Features

**Available Now:**
- **User Registration:** Create new user accounts
- **OTP Request:** Request One-Time Password via email
- **OTP Verification:** Verify OTP for secure actions
- **Login:** Secure user authentication
- **User Profile:** View and manage user details

**In Development:**
- **Savings Calculation:** Calculate percentage allocation between Bitcoin and Gold
- **Live Price Data:** Fetch current prices for Bitcoin and Gold
- **More Features:** Additional savings tools and insights coming soon

---

## Tech Stack

- **Node.js** v22.15.1
- **Express.js** for RESTful API
- **Mongoose** for MongoDB database operations
- **Nodemailer** for sending emails (including OTP)
- **Swagger** for interactive API documentation

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22.15.1
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

### Installation

```bash
git clone https://github.com/gandarain/GoldBitCalculatorBackend.git
cd GoldBitCalculatorBackend
npm install
```

### Environment Variables

Create a `.env` file in the project root and provide the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

### Running the Server

```bash
npm start
```

Server will run on `http://localhost:5000`

---

## API Documentation

Interactive API docs are available via Swagger:

- Visit: [`http://localhost:5000/api-docs`](http://localhost:5000/api-docs)

---

## Project Structure

```
src/
  config/         # Database and app config
  controllers/    # Request handlers
  routes/         # API route definitions
  models/         # Mongoose models
  utils/          # Utility functions
  index.js        # Entry point
```

---

## Roadmap

- [x] User Registration
- [x] OTP Request & Verification
- [X] Login
- [X] User Profile Management
- [ ] Savings Percentage Calculation (Bitcoin & Gold)
- [ ] Real-time Price Data Integration
- [ ] Advanced Savings Features

---

## License

This project is licensed under the MIT License.