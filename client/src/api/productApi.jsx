// Import Axios for HTTP requests
import axios from 'axios';

// ===========================
// API Base URL Configuration
// ===========================

// ✅ For development with local backend:
// Replace this with your deployed backend URL for production (e.g. Render)
const BASE_URL = 'http://localhost:5000';
// const BASE_URL = 'https://your-backend.onrender.com'; // <-- Use this in production

// Create a pre-configured Axios instance for cleaner API calls
const api = axios.create({
  baseURL: BASE_URL, // All requests will prefix this URL
});

// ===========================
// Product API Endpoints
// ===========================

// GET: Retrieve all products
export const getProducts = () => api.get('/products');

// POST: Add a new product to the database
export const addProduct = (product) => api.post('/products', product);

// PUT: Update an existing product by ID
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);

// DELETE: Remove a product by ID
export const deleteProduct = (id) => api.delete(`/products/${id}`);
