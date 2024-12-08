import React, { useState } from 'react';
import { Container, Tab, Nav, Alert } from 'react-bootstrap';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('view');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setActiveTab('edit');
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Container fluid className="mt-4">
      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
      
      <h2 className="mb-4">Admin Dashboard</h2>
      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="view">View Products</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="add">Add Product</Nav.Link>
          </Nav.Item>
          {selectedProduct && (
            <Nav.Item>
              <Nav.Link eventKey="edit">Edit Product</Nav.Link>
            </Nav.Item>
          )}
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="view">
            <ProductList onEdit={handleEdit} showAlert={showAlert} />
          </Tab.Pane>
          <Tab.Pane eventKey="add">
            <AddProduct showAlert={showAlert} />
          </Tab.Pane>
          <Tab.Pane eventKey="edit">
            {selectedProduct && (
              <EditProduct 
                product={selectedProduct} 
                showAlert={showAlert}
                onUpdate={() => setActiveTab('view')}
              />
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default AdminDashboard;