import React, {useState} from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProductItems } from '../components/shared/ProductItems';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './allroutes';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartReducer';



export default function ProductDetailsScreen({ productPrice, productName, productDesc, image }) {
 const [items, setItems] = useState(ProductItems);
 const dispatch=useDispatch()
 return (
  <SafeAreaView>
   {items.map((item) => (
    <ScrollView key={item.id}>
     {/*Details Title x Price */}
     {/* <Image
      source={require(item.image)}
     /> */}
      <View>
      <Text>{ item.productName}</Text>
      <Text>{ item.productPrice}</Text>
     </View>
     {/*End of Details Title x Price */}
     {/* Details Description */}
     <View>
      <Text>{ item.productDesc}</Text>
      </View>
     {/*End of Details Description */}
     {/* Ingredients */}
     <View>
      <Text>Ingredients</Text>
      <Text>Icon</Text>
     </View>
     {/* Nutritional Information */}
     <View>
      <Text>Nutritional Information</Text>
      <Text>Icon</Text>
     </View>
     {/* How to Prepare */}
     <View>
      <Text>How to Prepare</Text>
      <Text>Icon</Text>
     </View>
     {/* Dietary Information */}
     <View>
      <Text>Dietary Information</Text>
      <Text>Icon</Text>
     </View>
     {/* Storage Information */}
     <View>
      <Text>Storage Information</Text>
      <Text>Icon</Text>
     </View>
     {/* Extra */}
     <View>
      <Text>Extra</Text>
      <Text>Icon</Text>
     </View>

     {/* Counter */}
     <View>
      <Text>1</Text>
     </View>
     {/* Cart Button */}
     <Pressable onPress={()=>{dispatch(addItem(item))}}>
      <Text>Add to cart</Text>
     </Pressable>
    {/* Subscribe button */}
     <Pressable>
      <Text>Subscribe to a Plan</Text>
     </Pressable>
    </ScrollView>
   ))}
  </SafeAreaView>
 )
}
const styles = StyleSheet.create({
 detailsContainer: {
  flex:1
 }
})

// {/*Details Title x Price */ }
// <View>
//  <Text>African Donut Mix(Puff Puff)</Text>
//  <Text>£29.99</Text>
// </View>
// {/*End of Details Title x Price */ }
// {/* Details Description */ }
// <View>
//  <Text>Rare Eat Puff Puff Mix can be made into a deep-fried dough. They are made from yeast dough, shaped into balls and deep-fried until golden brown. It has a doughnut-like texture but slightly a Rare Eat Puff Puff Mix can be made into a deep-fried dough. They are made from yeast dough, shaped into balls and deep-fried until golden brown.</Text>
// </View>
// // {/*End of Details Description */ }