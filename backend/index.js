const express = require('express');
const cors = require('cors');
const db = require('./db/connection');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount product routes
app.use('/products', require('./routes/products'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

db.query('SELECT 1')
  .then(() => console.log('✅ DB connection successful!'))
  .catch(err => console.error('❌ DB connection failed:', err));