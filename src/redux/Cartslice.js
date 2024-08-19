import { createSlice } from "@reduxjs/toolkit";

// Helper function to save the cart to local storage
const saveToLocalStorage = (cart) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

// Helper function to load the cart from local storage
const loadFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return []; // Return an empty array during SSR
}

// Helper functions to calculate total price and quantity
const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => 
    total + (item.smartPrice ? item.smartPrice : item.price) * item.quantity, 0);
}

const calculateTotalQuantity = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

const cartSlice = createSlice({
  name: "Cart",
  initialState: loadFromLocalStorage(),
  reducers: {
    add(state, action) {
      const index = state.findIndex((item) => item._id === action.payload._id);

      if (index !== -1) {
        // If the item already exists, increment its quantity
        state[index].quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with an initial quantity of 1
        state.push({ ...action.payload, quantity: 1 });
      }

      saveToLocalStorage(state);
      alert('Item added to cart');
    },

    remove(state, action) {
      const index = state.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveToLocalStorage(state);
        alert('Item removed from cart');
      }
    },

    incrementQuantity(state, action) {
      const index = state.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state[index].quantity += 1;
        saveToLocalStorage(state);
      }
    },

    decrementQuantity(state, action) {
      const index = state.findIndex((item) => item._id === action.payload);
      if (index !== -1 && state[index].quantity > 1) {
        state[index].quantity -= 1;
        saveToLocalStorage(state);
      }
    }
  }
});

export const { add, remove, incrementQuantity, decrementQuantity } = cartSlice.actions;

// Selector to get the total price
export const selectTotalPrice = (state) => calculateTotalPrice(state.cart);

// Selector to get the total quantity
export const selectTotalQuantity = (state) => calculateTotalQuantity(state.cart);

export default cartSlice.reducer;
