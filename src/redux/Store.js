import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Cartslice'
import addressReducer from './addressSlice'
const store = configureStore({
    reducer:{
        cart:cartReducer,
        addresses: addressReducer,
    }
})
export default store;