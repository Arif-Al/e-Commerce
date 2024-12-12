import { createSlice } from "@reduxjs/toolkit";


export const cartItems = createSlice({
    name:"cart",
    initialState:{
        cartItem: [],
    },
    reducers:{
        addToCart : (state,action) => {
            console.log(action.payload, 'action');
            state.cartItem.push({...action.payload})
            
        },

    },

})

export const {addToCart} = cartItems.actions;
export default cartItems.reducer