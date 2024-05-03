import React from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import NewOrder from '../components/shared/NewOrder';
import { MaterialIcons } from '@expo/vector-icons';
import AppButton from '../components/shared/AppButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CartScreen({ navigation, route }) {
 const cartItem = route.params;
 
 return (
  <SafeAreaView style={styles.cartContainer}>

   {cartItem ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <MaterialCommunityIcons name="cart-remove" size={50} color="black" />
    <Text style={{ fontSize: 20, marginTop: 10 }}>No Item Has Been Added To Your Cart.</Text>
    <AppButton text='Go To Menu' onPress={() => navigation.navigate("Home")}/>
    </View>
   ) :(
    <View>
     <View style={{ marginVertical: 20, marginLeft: 15, backgroundColor: "#fff", width: 35, borderRadius: 5 }}>
      <MaterialIcons name="keyboard-arrow-left" size={30} color="black" onPress={navigation.goBack} />
     </View>
{/* List items section */}
     <ScrollView style={{height:"70%"}}>
      <NewOrder cartItem={cartItem} />

     </ScrollView>
     {/* Lower Layout plus Button */}
      <View>
       <View style={{flexDirection:"row",justifyContent:"space-between", width:"70%", marginHorizontal:30 }}>
        <Text>Total<Text style={{color:"gray"}}>(3 items)</Text></Text>
        <Text>£90</Text>
       </View>
      
      <Pressable style={({ pressed }) => [
       {
        backgroundColor: pressed ? '#FF3C00' : '#DB3C25',
       },
       styles.Checkoutbtn,
      ]}>
       <Text style={{color:"#fff"}}>Checkout- <Text>£90</Text></Text>
      </Pressable>
     </View>
     {/*End of Lower Layout plus Button */}
    </View>
   )
    }

  </SafeAreaView>
 )
}
const styles = StyleSheet.create({
 cartContainer: {
  flex: 1,
  
  backgroundColor: "#F9F9F9",
  
 },
 Checkoutbtn: {
  color: '#DB3C25',
  borderRadius: 20,
  width: 300,
  padding: 12,
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 20,
 }
 
})