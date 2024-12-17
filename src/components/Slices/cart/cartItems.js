import { createSlice } from "@reduxjs/toolkit";

export const cartItems = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existItems = state.cartItem.find(
        (item) => item.id === action.payload.id
      );
      if (existItems) {
        existItems.quantity += 1;
      } else {
        state.cartItem.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const existItems = state.cartItem.find(
        (item) => item.id === action.payload.id
      );
      if (existItems) {
        existItems.quantity += 1;
      }
    },
    DicreaseQuantity: (state, action) => {
      const existItems = state.cartItem.find(
        (item) => item.id === action.payload.id
      );
      if (existItems && existItems.quantity > 1) {
        existItems.quantity -= 1;
      } else if (existItems && existItems.quantity === 1) {
        state.cartItem = state.cartItem = state.cartItem.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    DeleteItem: (state, action) => {
      state.cartItem = state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id)
    },
  },
});

export const { addToCart, increaseQuantity, DicreaseQuantity, DeleteItem } =
  cartItems.actions;
export default cartItems.reducer;
