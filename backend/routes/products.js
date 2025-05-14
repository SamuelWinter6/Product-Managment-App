// Import Express and create a router instance
const express = require('express');
const router = express.Router();

// Import the configured MySQL connection pool
const db = require('../db/connection');


// =========================
// GET /products
// Fetch all products from the database
// =========================
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows); // Send all product records as JSON
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


// =========================
// POST /products
// Add a new product to the database
// =========================
router.post('/', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  // Validate required fields
  if (!name || !price || !description || !imageUrl)
    return res.status(400).json({ error: 'All fields are required' });

  try {
    // Insert new product into the database
    const [result] = await db.query(
      'INSERT INTO products (name, price, description, imageUrl) VALUES (?, ?, ?, ?)',
      [name, price, description, imageUrl]
    );

    // Respond with the newly created product
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});


// =========================
// PUT /products/:id
// Update a product by ID
// =========================
router.put('/:id', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  const { id } = req.params;

  try {
    // Update product data in the database
    await db.query(
      'UPDATE products SET name = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?',
      [name, price, description, imageUrl, id]
    );

    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});


// =========================
// DELETE /products/:id
// Remove a product by ID
// =========================
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});


// =========================
// GET /products/:id
// Fetch a single product by ID
// =========================
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);

    // Handle case where no product is found
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Export the router to be used in the main app
module.exports = router;
