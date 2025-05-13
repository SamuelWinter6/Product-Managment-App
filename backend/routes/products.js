const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET all products
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST new product
router.post('/', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  if (!name || !price || !description || !imageUrl)
    return res.status(400).json({ error: 'All fields are required' });

  try {
    const [result] = await db.query(
      'INSERT INTO products (name, price, description, imageUrl) VALUES (?, ?, ?, ?)',
      [name, price, description, imageUrl]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  const { id } = req.params;

  try {
    await db.query(
      'UPDATE products SET name = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?',
      [name, price, description, imageUrl, id]
    );
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
