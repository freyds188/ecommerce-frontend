// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter for routing
import store from './store/store';  // Import the store
import App from './App';  // Your root component


ReactDOM.render(
  <Provider store={store}>  {/* Wrap your App component in the Provider to connect Redux */}
    <BrowserRouter>  {/* Wrap your App in BrowserRouter for React Router */}
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')  // Make sure you have a div with id 'root' in your index.html
);
