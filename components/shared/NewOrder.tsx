import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { useNavigation } from '@react-navigation/native';
import ProductDetails from '../../screens/ProductDetailScreen';
import { ProductItems } from './ProductItems';


interface NewOrderProps {
 // ProductItems:any
 image: any;
 productName: string;
 productPrice: number;
 qty: number;
 onRemove: () => void;
 onAdd: () => void;
 addable: boolean;
 deletable: boolean;
}

const NewOrder: React.FC<NewOrderProps> = ({
 // ProductItems,
 image,
 productName,
 productPrice,
 qty,
 onRemove,
 onAdd,
 addable,
 deletable, }) =>{


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
     source={image}
    />
   </View>
   {/*End of Product Image Section */}

   {/* Text Section */}
   <View style={styles.sectionText}>
    <Text>{productName}</Text>
    <Text style={styles.priceText}>£{productPrice}</Text>
    <Pressable onPress={onRemove}>
     <AntDesign name="delete" size={20} color="black" />
    </Pressable>
   </View>
   {/*End of Text Section */}

   {/* Counter Button */}
   
   <View >

    {/* Reduce Button */}

    {deletable && (
     <Pressable style={{ backgroundColor: "#f9f9f9", width: 30, borderRadius: 5, padding: 5 }} onPress={onRemove}>
      <Entypo name="minus" size={20} color="gray" />
     </Pressable>
    )}

    {/* End of Reduce Button*/}

    {/* Quantity */}
    <Text style={{ fontSize: 18, marginLeft: 10, marginVertical: 5 }}>{qty}</Text>
    {/* End of Quantity */}

    {/* Add Button */}

    {addable && (
     <Pressable style={{ backgroundColor: "#f9f9f9", width: 30, borderRadius: 5, padding: 5 }} onPress={onAdd}>
      <Entypo name="plus" size={20} color="gray" />
     </Pressable>
    )}

    {/*End of Add Button */}

   </View>
   
  </Pressable>

 );
}
export default NewOrder;

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
  marginVertical:10,
  padding: 10,
  borderRadius: 20


 },
 sectionImage: {

  marginBottom: 20
 },
 image: {
  alignSelf: 'center',
  resizeMode: 'contain',
  objectFit: 'cover',
  height: 80,
  width: 50,

 },
 sectionText: {
  justifyContent:"space-evenly"
 },
 priceText: {
  color: '#DB3C25',
 },
 
});