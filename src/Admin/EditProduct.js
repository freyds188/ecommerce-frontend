import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function EditProduct({ product, showAlert, onUpdate }) {
  const [formData, setFormData] = useState({
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    category: product.category
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${product.id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      showAlert('Product updated successfully');
      onUpdate();
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error updating product', 'danger');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Description </Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update Product
      </Button>
    </Form>
  );
}

export default EditProduct;