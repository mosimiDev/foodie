import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem{
 id: number;
 name: string;
 qty: number;
 sum: number;
 productPrice: number;
}
interface Cartstate{
 items: CartItem[];
}

const initialState:Cartstate = {
 items: [],
}; 
const cartSlice = createSlice({
 name: "cart",
 initialState,
 reducers: {
  addItem: (state, action: PayloadAction<CartItem>) => {
   const existingItem = state.items.find(
    item => item.id == action.payload.id,
   );
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
   
  }
 }
})

export const {addItem } = cartSlice.actions
export default cartSlice.reducer