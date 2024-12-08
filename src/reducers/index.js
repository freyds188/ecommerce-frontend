import { combineReducers } from 'redux';

// Initial state for authentication
const initialAuthState = {
  isAuthenticated: false,
  user: null,
};

// Authentication reducer to handle login and logout
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

// Initial state for the cart (example of another reducer)
const initialCartState = {
  items: [],
};

// Cart reducer to handle add and remove items
const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    default:
      return state;
  }
};

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,   // Handles authentication
  cart: cartReducer,   // Handles cart state
  // You can add more reducers here as your app grows
});

export default rootReducer;
