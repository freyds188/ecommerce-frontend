import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function AddProduct({ showAlert }) {
  const [product, setProduct] = useState({
    barcode: '',
    description: '',
    price: '',
    quantity: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', product, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      showAlert('Product added successfully');
      setProduct({ barcode: '', description: '', price: '', quantity: '', category: '' });
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error adding product', 'danger');
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Barcode</Form.Label>
        <Form.Control
          type="text"
          name="barcode"
          value={product.barcode}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity </Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
}

export default AddProduct;