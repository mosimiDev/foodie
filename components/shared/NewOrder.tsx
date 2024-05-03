import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import ProductDetails from '../../screens/ProductDetailScreen';


export default function NewOrder({ cartItem }) {




 return (

  <Pressable
   style={({ pressed }) => [
    {
     backgroundColor: pressed ? '#ECECEC' : 'white',
    },
    styles.wrapperCustom,
   ]}

  >

   {/*  Product Image Section */}
   <View style={styles.sectionImage}>
    <Image
     style={styles.image}
     source={cartItem.image}
    />
   </View>
   {/*End of Product Image Section */}

   {/* Text Section */}
   <View style={styles.sectionText}>
    <Text>{cartItem.productName}</Text>
    <Text style={styles.priceText}>{cartItem.productPrice}</Text>
    <View >
     <AntDesign name="delete" size={20} color="black" />
    </View>
   </View>
   {/*End of Text Section */}

   {/* Counter Button */}
   
   <View >
    <View style={{ backgroundColor: "#f9f9f9", width: 30, borderRadius: 5, padding: 5 }}><Entypo name="minus" size={20} color="gray" /></View>

    <Text style={{ fontSize: 18,marginLeft:10, marginVertical:5 }}>1</Text>
    <View style={{ backgroundColor: "#f9f9f9", width: 30, borderRadius: 5, padding: 5 }}><Entypo name="plus" size={20} color="gray" /></View>
   </View>
   
  </Pressable>

 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#f9f9f9",
  alignItems: "center",

 },
 
 wrapperCustom: {
  flexDirection: "row",
  justifyContent:"space-between",
  width: "80%",
  marginHorizontal: 20,
  padding:10,


 },
 sectionImage: {

  marginBottom: 20
 },
 image: {
  alignSelf: 'center',
  resizeMode: 'contain',
  objectFit: 'cover',
  height: 80,
  width: 76,

 },
 sectionText: {
  justifyContent:"space-evenly"
 },
 priceText: {
  color: '#DB3C25',
 },
 
});