import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setForm(res.data);
      })
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, form);
      setProduct(form); // update displayed data
      setEditMode(false);
    } catch (err) {
      alert('❌ Failed to update product.');
    }
  };

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>❌ Product not found or unavailable.</p>
        <button className="create-btn" onClick={() => navigate('/')}>⬅ Back to Products</button>
      </div>
    );
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <button className="create-btn" onClick={() => navigate('/')}>⬅ Back to Products</button>

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
          <button className="create-btn" onClick={() => setEditMode(true)}>✏️ Edit Product</button>
        </>
      )}
    </div>
  );
}

export default ProductView;
