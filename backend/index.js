// Import core modules
const express = require('express');
const cors = require('cors');
const db = require('./db/connection'); // MySQL connection pool
require('dotenv').config(); // Load environment variables

// Create an instance of the Express app
const app = express();

// Define the port to run the server on (default: 5000)
const port = process.env.PORT || 5000;

// ========================
// Middleware Setup
// ========================

// Enable CORS for cross-origin requests (frontend ↔ backend)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// ========================
// API Routes
// ========================

// Mount product-related API endpoints under /products
app.use('/products', require('./routes/products'));

// ========================
// Default Root Route
// ========================

// Provide a basic confirmation endpoint for root URL
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// ========================
// Start the Server
// ========================

// Start listening on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// ========================
// Database Health Check
// ========================

// Test initial connection to the MySQL database
db.query('SELECT 1')
  .then(() => console.log('✅ DB connection successful!'))
  .catch(err => console.error('❌ DB connection failed:', err));
