import React from 'react';
import { FlatList } from 'react-native';

import NewOrder from './NewOrder';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface OrderListProps{
 onRemove: (item: any) => void;
 onAdd: (item: any) => void;
 deletable: boolean;
 addable: boolean;
}
const OrderList: React.FC<OrderListProps> = ({ onRemove,
 onAdd,
 deletable,
 addable, }) => {
 
 const { items } = useSelector((state: RootState) => state.cart)
 return (
  <FlatList
   showsVerticalScrollIndicator={false}
   data={items}
   keyExtractor={(item) => item.productName}
   renderItem={({ item }) => (
    <NewOrder
     image={item.image}
     productName={item.productName}
     productPrice={item.productPrice}
     qty={item.qty}
     onRemove={() => onRemove(item)}
     onAdd={() => onAdd(item)}
     deletable={deletable}
     addable={addable}
    />
   )}
  />
 )
}
export default OrderList;