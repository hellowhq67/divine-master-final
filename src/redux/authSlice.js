import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch user data from the API
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user/all-users/${userID}`);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.user);
    }
  }
);

const initialState = {
  user: null,
  isAdmin: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAdmin = action.payload?.isAdmin === "Admin";
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user data";
      });
  },
});

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
