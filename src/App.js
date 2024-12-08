import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Container, Nav } from 'react-bootstrap';
import AdminDashboard from './Admin/AdminDashboard';
import CustomerProductList from './Customer/CustomerProductList';
import Cart from './Customer/Cart';
import Checkout from './Customer/Checkout';
import Login from './Authentication/Login';
import Register from './Authentication/Register';


function App() {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);

  const PrivateRoute = ({ children, requireAdmin }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (requireAdmin && user?.role !== 'admin') return <Navigate to="/" />;
    return children;
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">E-Commerce Store!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' ? (
                    <Nav.Link href="/admin">Admin Dashboard </Nav.Link>
                  ) : (
                    <>
                      <Nav.Link href="/">Products</Nav.Link>
                      <Nav.Link href="/cart">
                        Cart ({cartItems.length})
                      </Nav.Link>
                    </>
                  )}
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute requireAdmin={true}>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />

        {/* Customer Routes */}
        <Route 
          path="/" 
          element={
            <PrivateRoute requireAdmin={false}>
              <CustomerProductList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <PrivateRoute requireAdmin={false}>
              <Cart />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <PrivateRoute requireAdmin={false}>
              <Checkout />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;