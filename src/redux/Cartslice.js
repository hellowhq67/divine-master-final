import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // Import Toastify

// Helper function to save the cart to local storage
const saveToLocalStorage = (cart) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
const TotalAmountERU = (cart) => {
  return cart.reduce((total, item) => 
    total + item.priceUsd * item.quantity, 0);
};
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
  initialState: {
    items: loadFromLocalStorage(),
    discount: 0,
     // Store discount amount
  },
  reducers: {
    add(state, action) {
      const index = state.items.findIndex((item) => item._id === action.payload._id);

      if (index !== -1) {
        // If the item already exists, increment its quantity
        state.items[index].quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with an initial quantity of 1
        state.items.push({ ...action.payload, quantity: 1 });
      }

      saveToLocalStorage(state.items);
      toast.success('Item added to cart');
    },

    remove(state, action) {
      const index = state.items.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        saveToLocalStorage(state.items);
        toast.success('Item removed from cart');
      }
    },

    incrementQuantity(state, action) {
      const index = state.items.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state.items[index].quantity += 1;
        saveToLocalStorage(state.items);
      }
    },

    decrementQuantity(state, action) {
      const index = state.items.findIndex((item) => item._id === action.payload);
      if (index !== -1 && state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
        saveToLocalStorage(state.items);
      }
    },

    applyCoupon(state, action) {
      const { couponCode } = action.payload;

      // Apply a discount based on the coupon code
      // For example, "SAVE10" gives a 10% discount
      if (couponCode === "SAVE10") {
        state.discount = 0.10; // 10% discount
        toast.success('Coupon applied! You saved 10%');
      } else {
        state.discount = 0;
        toast.error('Invalid coupon code');
      }
    }
  }
});

// Selector to get the total price after applying the discount
export const selectTotalPrice = (state) => {
  const totalPrice = calculateTotalPrice(state.cart.items);
  return totalPrice * (1 - state.cart.discount);
};
export const selectTotalPriceEUR = (state) => {
  const totalPriceEUR = TotalAmountERU(state.cart.items);
  return totalPriceEUR * (1 - state.cart.discount); // Apply discount if applicable
};

// Selector to get the total quantity
export const selectTotalQuantity = (state) => calculateTotalQuantity(state.cart.items);

export const { add, remove, incrementQuantity, decrementQuantity, applyCoupon } = cartSlice.actions;

export default cartSlice.reducer;
