import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Cartslice'
import addressReducer from './addressSlice'
import authReducer from './authSlice'
import favoritesReducer from './favoritesSlice'; // Corrected the import statement

const store = configureStore({
    reducer:{
        cart:cartReducer,
        addresses: addressReducer,
        auth:addressReducer,
        favorites: favoritesReducer,
    }
})
export default store;