import { createSlice } from "@reduxjs/toolkit";


export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count:15,
    },
    reducers:{},  
} )


export const {cartItems} = counterSlice.actions;

export default counterSlice.reducer;

