import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { getProducts } from './api/productApi';
import './App.css';

function App() {
  const [view, setView] = useState('add');
  const [productToEdit, setProductToEdit] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Product Manager</h1>

      <ProductForm
        view={view}
        product={productToEdit}
        setView={setView}
        setProductToEdit={setProductToEdit}
        onChange={fetchProducts} // ✅ Pass this function down
      />

      <ProductList
        products={products}
        setView={setView}
        setProductToEdit={setProductToEdit}
        onChange={fetchProducts} // 👈 also for delete
      />
    </div>
  );
}

export default App;
