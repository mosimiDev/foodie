import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import ProductDetails from '../../screens/ProductDetailScreen';


export default function NewOrder({ productName, productPrice, image }) {




 return (

  <Pressable
   style={({ pressed }) => [
    {
     backgroundColor: pressed ? 'rgba(210, 230, 255, 0.4)' : 'white',
    },
    styles.wrapperCustom,
   ]}

  >

   {/*  Product Image Section */}
   <View style={styles.sectionImage}>
    <Image
     style={styles.image}
     source={image}
    />
   </View>
   {/*End of Product Image Section */}

   {/* Text Section */}
   <View style={styles.sectionText}>
    <Text>{productName}</Text>
    <Text style={styles.priceText}>{productPrice}</Text>
    <View style={styles.heartIcon}>
     <Feather name="heart" size={16} color="black" />
    </View>
   </View>
   {/*End of Text Section */}

   {/* Counter Button */}
   <Pressable
    style={({ pressed }) => [
     {
      backgroundColor: pressed ? 'rgba(210, 230, 255, 0.4)' : '#DB3C25',
     },
     styles.btnCustom,
    ]}
   >
    <SimpleLineIcons name="bag" size={14} color="white" />
    <Text style={{ color: 'white' }}>1</Text>
    <SimpleLineIcons name="bag" size={14} color="white" />
   </Pressable>
  </Pressable>

 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#f9f9f9",
  alignItems: "center",

 },
 heartIcon: {
  alignSelf: 'flex-end'
 },
 wrapperCustom: {
  margin: 5,
  borderWidth: 1,
  padding: 15,
  borderRadius: 8,
  height: 250,
  width: 150


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
  flexDirection: 'row',
  gap: 8,
  height: 30,
  padding: 5,
  justifyContent: "center",
 },
 priceText: {
  color: '#DB3C25',
 },
 btnCustom: {
  color: '#DB3C25',
  flexDirection: 'row',
  gap: 5,
  borderRadius: 20,
  width: 100,
  padding: 10,
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 20,
 }
});