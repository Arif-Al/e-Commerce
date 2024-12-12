import counterReducers from "../components/Slices/sliceCounter"
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../components/Slices/cart/cartItems"

export const store = configureStore ({
    reducer :{ 
        counter: counterReducers,
        cart: cartReducer,
    }
})