import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import ProductCard from '../components/shared/ProductCard';
import { ProductItems } from '../components/shared/ProductItems';
import Menu from './MenuScreen';
import Cart from './CartScreen';
import Account from './AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
 const [userInput, setUserInput] = React.useState("")



 const filterData = (item) => {
  // if input is empty
  if (userInput === "") {
   return (
    <ProductCard
     image={item.image}
     productName={item.productName}
     productPrice={item.productPrice}

    />
   );
  }

  // if user input is populated
  if (item.productName.toLowerCase().includes(userInput.toLowerCase())) {
   return (
    <ProductCard
     image={item.image}
     productName={item.productName}
     productPrice={item.productPrice}

    />
   )
  }
  else {
   <Text style={{ fontSize: 20, textAlign: 'center' }}>
    Data does not exist
   </Text>
  }
 
 }

 return (
  <View style={styles.homeContainer}>
   <StatusBar style="dark" />
   <SafeAreaView>
    <TextInput
     style={styles.input}
     
     value={userInput}
     onChangeText={(text)=>setUserInput(text)}
     placeholder="Search"
    />
   </SafeAreaView>

   <SafeAreaView style={{ flex: 1, }}>
    {filterData.length === 0 ? (
     <Text style={{ fontSize: 20, textAlign: 'center' }}>
      Data does not exist
     </Text>
    ) : <FlatList

     numColumns={2}
     showsVerticalScrollIndicator={false}
     horizontal={false}
     data={ProductItems}
     keyExtractor={(item, index) => 'key' + index}
     renderItem={({ item }) => filterData(item)}
    />}


    
   </SafeAreaView>
  </View>

 )
}
const styles = StyleSheet.create({
 homeContainer: {
  alignItems: "center",
  flex: 1,
  backgroundColor: "#F9F9F9",
 },
 input: {
  height: 40,
  width: 250,
  margin: 10,
  marginTop: 42,
  borderWidth: 1,
  padding: 10,
  borderRadius: 8,


 },
 
})