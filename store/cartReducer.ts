import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItems } from '../components/shared/ProductItems';

interface CartItem{
 id: string;
 productName: string;
 productPrice: number;
 quantity: number;
 sum: number;
 image:string


}
interface CartState{
 items: CartItem[];
}

const initialState: CartState = {
 items: [],
};
const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers: {
  addItem: (state, action) => {
   const isExist = state.items.find(item => item.id == action.payload?.id)
   if (isExist) {
    isExist.sum += action.payload?.price
    isExist.quantity += 1;
   } else {
    state.items.push({
     ...action.payload,
     sum: action.payload?.price
    })
   }
   
  }
  // removeItem
 },
});
export const {addItem } = cartSlice.actions;
export default cartSlice.reducer;