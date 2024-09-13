BookShelf
BookShelf is a comprehensive book management system designed to help users manage their book collections efficiently. It provides functionalities for book management, user registration, and email verification, all integrated with a user-friendly API.

Table of Contents
Features
Tech Stack
Setup and Installation
API Documentation
Running Tests
Usage

Features
User Registration: Register new users with email verification.
Book Management: Add, update, and delete books.
Book Images: Upload and manage book cover images.
Pagination: Efficiently retrieve book lists with pagination.
Error Handling: Comprehensive error handling for robust API responses.
Email Notifications: Send registration and verification emails using Nodemailer.

Tech Stack
Node.js: JavaScript runtime for building the server-side application.
Express.js: Web framework for building the API.
Sequelize: ORM for interacting with the database.
MySQL: Relational database management system.
Nodemailer: Module for sending emails.
Joi: Validation library for request payloads.
JWT: JSON Web Tokens for user authentication.

Setup and Installation
Prerequisites
Node.js (v14 or higher)
MySQL database
Mailtrap or SMTP credentials for email service
Clone the Repository
git clone https://github.com/yourusername/bookshelf.git
Install Dependencies
npm install
Configure Environment Variables
Create a .env file in the root directory and add the following environment variables:

makefile
Copy code
// Databse
DB_HOST=your-host
DB_PORT=your-port
DB_USER=your-user
DB_PASS=your-possword
DB_NAME=books
// PORT
PORT=3000
//JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN='1h'
//Push Notification
ONE_SIGNAL_APP_ID=your-app-id
ONE_SIGNAL_API_KEY=your-api-key
//NodeMailer mailtrap credentials
EMAIL=your-email-user
PASSWORD=your-email-password
//Base URL
BASE_URL=base_url

Run Database Migrations
npx sequelize-cli db:migrate

Start the Server
npm start
The server will start on port 3000 by default.

API Documentation
base_url/api-docs/

Running Tests
To run tests, ensure you have the testing dependencies installed and execute:
npm test

Usage
After setting up the project, you can use the API endpoints to manage books and users. Refer to the API documentation section for detailed information on each endpoint.

