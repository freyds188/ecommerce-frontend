import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    shipping_details: '',
    payment_method: 'cash_on_delivery'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/checkout', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/order-success');
    } catch (error) {
      console.error('Error during checkout:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-4">
        <h2>Checkout</h2>
        <p>Your cart is empty</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-8">
          <Card className="mb-4">
            <Card.Header>Order Summary</Card.Header>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <div className="d-flex justify-content-between">
                    <div>
                      {item.product.description}
                      <small className="text-muted"> x {item.quantity}</small>
                    </div>
                    <div>${(item.product.price * item.quantity).toFixed(2)}</div>
                  </div>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>${calculateTotal().toFixed(2)}</strong>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>

          <Card>
            <Card.Header>Checkout Details</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Shipping Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="shipping_details"
                    value={formData.shipping_details}
                    onChange={handleChange}
                    placeholder="Enter your complete shipping address"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                    required
                  >
                    <option value="cash_on_delivery">Cash on Delivery</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="success" type="submit">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default Checkout;