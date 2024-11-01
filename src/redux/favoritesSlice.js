import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // Import Toastify

// Helper function to save the favorites to local storage
const saveFavoritesToLocalStorage = (favorites) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

// Helper function to load the favorites from local storage
const loadFavoritesFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }
  return []; // Return an empty array during SSR
}

const favoritesSlice = createSlice({
  name: "Favorites",
  initialState: loadFavoritesFromLocalStorage(),
  reducers: {
    addToFavorites(state, action) {
      const index = state.findIndex((item) => item._id === action.payload._id);

      if (index === -1) {
        // If the item doesn't exist in favorites, add it
        state.push(action.payload);
        saveFavoritesToLocalStorage(state);
        toast.success('Item added to favorites'); // Show success toast
      } else {
        toast.info('Item is already in favorites'); // Show info toast
      }
    },

    removeFromFavorites(state, action) {
      const index = state.findIndex((item) => item._id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveFavoritesToLocalStorage(state);
        toast.success('Item removed from favorites'); // Show success toast
      }
    }
  }
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
