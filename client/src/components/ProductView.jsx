// Import hooks and dependencies
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Component for displaying and editing a single product
function ProductView() {
  const { id } = useParams();         // Get product ID from the URL
  const navigate = useNavigate();     // Hook for navigating between views

  const [product, setProduct] = useState(null); // Holds the fetched product
  const [error, setError] = useState(false);    // Error state if fetch fails
  const [editMode, setEditMode] = useState(false); // Toggles between view/edit mode

  // Form state to store editable input values
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  // Fetch product details from backend on component mount
  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => {
        setProduct(res.data);    // Store product data
        setForm(res.data);       // Prefill form with product data
      })
      .catch(err => {
        console.error(err);
        setError(true);          // Trigger error message if not found
      });
  }, [id]);

  // Update form state as user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission for updating the product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, form);
      setProduct(form);      // Update local product view with new data
      setEditMode(false);    // Exit edit mode
    } catch (err) {
      alert('❌ Failed to update product.');
    }
  };

  // If product not found, show fallback error message
  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>❌ Product not found or unavailable.</p>
        <button className="create-btn" onClick={() => navigate('/')}>⬅ Back to Products</button>
      </div>
    );
  }

  // While loading data
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      {/* Back button */}
      <button className="create-btn" onClick={() => navigate('/')}>⬅ Back to Products</button>

      {/* Conditionally render Edit Form or Product View */}
      {editMode ? (
        <form className="product-form" onSubmit={handleUpdate}>
          <h3>Edit Product</h3>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} alt={product.name} />
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>

          <button className="create-btn" onClick={() => setEditMode(true)}>
            ✏️ Edit Product
          </button>
        </>
      )}
    </div>
  );
}

export default ProductView;
