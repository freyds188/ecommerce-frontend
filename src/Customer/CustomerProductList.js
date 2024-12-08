import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await axios.post('/api/cart', {
        product_id: product.id,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (error) {
    return <div className="container mt-4 text-center">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Available Products</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.description}</h5>
                <p className="card-text">
                  <strong>Price:</strong> ${product.price}<br />
                  <strong>Category:</strong> {product.category}<br />
                  <strong>Stock:</strong> {' '}
                  <span className={`badge ${product.quantity > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.quantity < 1}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerProductList;