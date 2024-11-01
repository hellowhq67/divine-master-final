// src/redux/currencySlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper function to get the initial currency from localStorage or default to EUR
const getInitialCurrency = () => {
  if (typeof window !== "undefined") {
    const savedCurrency = localStorage.getItem("currency");
    return savedCurrency ? savedCurrency : "BDT"; // Default to EUR
  }
  return "BDT";
};

const initialState = {
  currency: getInitialCurrency(), // Use the saved currency or default to EUR
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("currency", action.payload); // Save the currency in localStorage
      }
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export const selectCurrency = (state) => state.currency.currency;

export default currencySlice.reducer;
