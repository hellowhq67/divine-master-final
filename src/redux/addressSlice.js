// src/features/addressSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
  },
});

export const { setAddresses } = addressSlice.actions;
export default addressSlice.reducer;
