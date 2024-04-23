import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '../components/shared/AppButton';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ProductItems } from '../components/shared/ProductItems';
import NewOrder from '../components/shared/NewOrder';
export default function CartScreen() {
 const { items } = useSelector((state: RootState) => state.cart)
 
 return (
  <View style={styles.cartContainer}>
   {/* <View>
   <MaterialCommunityIcons name="cart-remove" size={50} color="black" />
   <Text style={{ fontSize: 20, marginTop: 10 }}>No Item Has Been Added To Your Cart.</Text>
    <AppButton text='Go To Menu' />
   </View> */}
   <View>
   <FlatList
    showsVerticalScrollIndicator={false}
    data={items}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
     <NewOrder
      image={item.image}
      productName={item.productName}
      productPrice={item.productPrice}
     />
     )}
     
    />
    {items.map((item) => (
     <View>
      <Text>Total<span>{items.length}items</span></Text>
      <Text>{item.sum}</Text>
      <Pressable>
       <Text>Checkout- <span>{item.sum}items</span></Text>
      </Pressable>
     </View>
    ))}
   </View>

  </View>
 )
}
const styles = StyleSheet.create({
 cartContainer: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: "#F9F9F9",
  justifyContent:'center'
 }
 
})