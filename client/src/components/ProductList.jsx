// Import navigation hook from React Router and local state hook
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteProduct } from '../api/productApi';

// Component to display the full product table with selectable rows
function ProductList({ products, onChange }) {
  const navigate = useNavigate();

  // State to track which product IDs are selected
  const [selected, setSelected] = useState([]);

  // Navigate to the detail view when a row is clicked
  const handleRowClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Toggle the selection of a product by ID
  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(pid => pid !== id) // Unselect if already selected
        : [...prev, id]                  // Add to selected list
    );
  };

  // Handle deletion of all selected products
  const handleDeleteSelected = async () => {
    if (selected.length === 0) return; // Skip if nothing selected

    const confirmDelete = window.confirm(`Delete ${selected.length} selected products?`);
    if (!confirmDelete) return;

    try {
      // Delete all selected products concurrently
      await Promise.all(selected.map(id => deleteProduct(id)));

      setSelected([]);  // Reset selection
      onChange();       // Refresh the product list
    } catch (err) {
      alert('Failed to delete selected products.');
    }
  };

  return (
    <div>
      {/* Top Action Bar */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <button
          className="create-btn"
          onClick={handleDeleteSelected}
          disabled={selected.length === 0}
        >
          ❌ Delete Selected
        </button>
      </div>

      {/* Product Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              {/* Checkbox for selection */}
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(p.id)}
                  onChange={() => toggleSelect(p.id)}
                />
              </td>

              {/* Clickable cells navigate to detail view */}
              <td onClick={() => handleRowClick(p.id)}>{p.id}</td>
              <td onClick={() => handleRowClick(p.id)}>{p.name}</td>
              <td onClick={() => handleRowClick(p.id)}>{p.description}</td>
              <td onClick={() => handleRowClick(p.id)}>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
