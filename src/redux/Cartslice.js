import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // Import Toastify

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

// Predefined list of valid coupons and their discounts
const validCoupons = {
  "DIVINEWELCOME": 0.30,  // 30% discount
  "DIVINESAVE10": 0.10,   // 10% discount
  "DIVINEFEST": 0.20,     // 20% discount
};

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: loadFromLocalStorage(),
    discount: 0, // Store discount percentage (e.g., 0.10 for 10%)
    appliedCoupon: "", // Track the applied coupon
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

      if (validCoupons[couponCode]) {
        state.discount = validCoupons[couponCode]; // Set the discount
        state.appliedCoupon = couponCode; // Store the applied coupon
        toast.success(`Coupon applied! You get a ${state.discount * 100}% discount.`);
      } else {
        state.discount = 0; // Reset discount
        state.appliedCoupon = ""; // Clear the applied coupon
        toast.error("Invalid or expired coupon");
      }
    }
  }
});

// Selector to get the total price after applying the discount
export const selectTotalPrice = (state) => {
  const totalPrice = calculateTotalPrice(state.cart.items);
  return totalPrice * (1 - state.cart.discount);
};

// Selector to get the total quantity
export const selectTotalQuantity = (state) => calculateTotalQuantity(state.cart.items);

export const { add, remove, incrementQuantity, decrementQuantity, applyCoupon } = cartSlice.actions;

export default cartSlice.reducer;
