const initialState = {
    cart: {
      items: [],  // Initialize the items array
    },
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cart: {
            items: [...state.cart.items, action.payload], // Add item to cart
          },
        };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cart: {
            items: state.cart.items.filter(item => item.id !== action.payload.id),
          },
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  