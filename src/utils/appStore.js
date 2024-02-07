import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartReducer } from "./cartSlice";

const appStore = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default appStore;
