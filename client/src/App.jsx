// Import core React hooks and custom components
import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { getProducts } from './api/productApi';
import './App.css'; // Import global CSS styles

// Main App component: manages state and renders product form + table
function App() {
  // State for controlling which view is active (optional, unused in current version)
  const [view, setView] = useState('add');

  // Holds the product being edited (if any)
  const [productToEdit, setProductToEdit] = useState(null);

  // Main state array containing all products fetched from backend
  const [products, setProducts] = useState([]);

  // Fetch products from the backend API and update state
  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  // Run fetchProducts once when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Product Manager</h1>

      {/* Product creation form (popup toggle handled internally) */}
      <ProductForm
        view={view}
        product={productToEdit}
        setView={setView}
        setProductToEdit={setProductToEdit}
        onChange={fetchProducts} // Refetch products on successful add
      />

      {/* Product table with multi-select and row click view/edit */}
      <ProductList
        products={products}
        setView={setView}
        setProductToEdit={setProductToEdit}
        onChange={fetchProducts} // Refetch products on successful delete
      />
    </div>
  );
}

export default App;
