import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";

export const store = configureStore({
 reducer: {
  cart:cartReducer
 }
})

export type RootState= ReturnType<typeof store.getState>