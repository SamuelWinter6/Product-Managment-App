// Import the MySQL2 library for creating a connection pool
const mysql = require('mysql2');

// File system module to read the SSL certificate
const fs = require('fs');

// Load environment variables from the .env file
require('dotenv').config();

// Create a MySQL connection pool with SSL for secure cloud access
const pool = mysql.createPool({
  // Database connection details from environment variables
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  // Use a secure CA certificate (mounted in Render) to encrypt traffic
  ssl: {
    ca: fs.readFileSync('/etc/secrets/ca.pem')
  },

  // Pool configuration: allow multiple simultaneous connections
  waitForConnections: true,
  connectionLimit: 10,  // Max concurrent DB connections
  queueLimit: 0         // Unlimited request queue when busy
});

// Export the promise-based pool interface to use async/await in queries
module.exports = pool.promise();
