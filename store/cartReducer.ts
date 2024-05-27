import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
 id: number;
 productName: string;
 image: string;
 qty: number;
 sum: number;
 productPrice: number;
}
interface Cartstate {
 items: CartItem[];
}

const initialState: Cartstate = {
 items: [],
};
const cartSlice = createSlice({
 name: "cart",
 initialState,
 reducers: {
  addItem: (state, action: PayloadAction<CartItem>) => {
   const existingItem = state.items.find(
    item => item.id == action.payload.id,
   )
   if (existingItem) {

    existingItem.qty += 1;
    existingItem.sum += action.payload?.productPrice;
   } else {
    state.items.push({
     ...action.payload,
     qty: 1,
     sum: action.payload?.productPrice,

    })
   }
  },
  removeItem: (state, action: PayloadAction<{ id: number; productPrice: number }>) => {
   const existingItem = state.items.find(
    (item) => item.id === action.payload.id
   );

   if (existingItem && existingItem.qty != 1) {
    existingItem.qty -= 1;
    existingItem.sum -= action.payload.productPrice;
   } else {
    state.items = state.items.filter((item) => item.id !== action.payload.id);
   }
  },
  clearCart: (state) => {
   state.items = []
   return state;
  },
 }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer