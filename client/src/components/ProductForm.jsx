import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { addProduct } from '../api/productApi';

function ProductForm({ onChange }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');


  const onSubmit = async (data) => {
    try {
      await addProduct(data);
      onChange();
      reset();
      setShowForm(false);
    } catch (err) {
      alert('Failed to submit product: ' + err.message);
    }
  };

  return (
    <div>
      {!showForm ? (
        <button className="create-btn" onClick={() => setShowForm(true)}>➕ Create Product</button>
      ) : (
        <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
          <h3>New Product</h3>

          <input placeholder="Name" {...register('name', { required: true })} />
          {errors.name && <p className="error-text">Name is required</p>}

          <textarea placeholder="Description" {...register('description', { required: true })} />
          {errors.description && <p className="error-text">Description is required</p>}

          <input type="number" step="0.01" placeholder="Price" {...register('price', { required: true })} />
          {errors.price && <p className="error-text">Price is required</p>}

          <input placeholder="Image URL" {...register('imageUrl', { required: true })} onBlur={(e) => setPreviewUrl(e.target.value)} />
          {previewUrl && ( <img src={previewUrl} alt="Preview" style={{ width: '120px', borderRadius: '4px', marginTop: '8px' }} />)}
          {errors.imageUrl && <p className="error-text">Image URL is required</p>}

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
