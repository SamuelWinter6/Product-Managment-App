// Import React hooks and form library
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { addProduct } from '../api/productApi';

// ProductForm component handles creating a new product
function ProductForm({ onChange }) {
  // Initialize react-hook-form with form state and validation
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // State to toggle the form visibility
  const [showForm, setShowForm] = useState(false);

  // State to hold the image preview URL
  const [previewUrl, setPreviewUrl] = useState('');

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      await addProduct(data);   // Call API to add new product
      onChange();               // Refresh product list
      reset();                  // Clear form inputs
      setShowForm(false);       // Hide the form
    } catch (err) {
      alert('Failed to submit product: ' + err.message); // Show error if API fails
    }
  };

  return (
    <div>
      {/* Toggle button to show the form */}
      {!showForm ? (
        <button className="create-btn" onClick={() => setShowForm(true)}>➕ Create Product</button>
      ) : (
        // Product input form
        <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
          <h3>New Product</h3>

          {/* Product Name Input */}
          <input placeholder="Name" {...register('name', { required: true })} />
          {errors.name && <p className="error-text">Name is required</p>}

          {/* Description (textarea) */}
          <textarea placeholder="Description" {...register('description', { required: true })} />
          {errors.description && <p className="error-text">Description is required</p>}

          {/* Price Input (number) */}
          <input type="number" step="0.01" placeholder="Price" {...register('price', { required: true })} />
          {errors.price && <p className="error-text">Price is required</p>}

          {/* Image URL Input + Preview */}
          <input
            placeholder="Image URL"
            {...register('imageUrl', { required: true })}
            onBlur={(e) => setPreviewUrl(e.target.value)} // Set preview when focus leaves field
          />
          {/* Image Preview */}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: '120px', borderRadius: '4px', marginTop: '8px' }}
            />
          )}
          {errors.imageUrl && <p className="error-text">Image URL is required</p>}

          {/* Submit & Cancel Buttons */}
          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProductForm;
