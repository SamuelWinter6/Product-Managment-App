import axios from 'axios';

// Replace this with your actual Render backend URL when deployed
// const BASE_URL = 'https://your-backend.onrender.com';

// ✅ Use this for local backend:
const BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getProducts = () => api.get('/products');
export const addProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
