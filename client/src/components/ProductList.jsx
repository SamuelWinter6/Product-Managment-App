import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteProduct } from '../api/productApi';

function ProductList({ products, onChange }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const handleRowClick = (id) => {
    navigate(`/product/${id}`);
  };

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;

    const confirmDelete = window.confirm(`Delete ${selected.length} selected products?`);
    if (!confirmDelete) return;

    try {
      await Promise.all(selected.map(id => deleteProduct(id)));
      setSelected([]);
      onChange(); // Refresh the list
    } catch (err) {
      alert('Failed to delete selected products.');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <button className="create-btn" onClick={handleDeleteSelected} disabled={selected.length === 0}>
          ❌ Delete Selected
        </button>
      </div>

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
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(p.id)}
                  onChange={() => toggleSelect(p.id)}
                />
              </td>
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
