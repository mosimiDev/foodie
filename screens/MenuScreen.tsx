import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TextInput, Text, View, FlatList } from 'react-native';
import ProductCard from '../components/shared/ProductCard';
import { ProductItems } from '../components/shared/ProductItems';

export default function MenuScreen() {
 const [userText, setUserText] = React.useState("")


 const filterItem=(item) => {
  if (userText === "") {
   return (
    <ProductCard
     image={item.image}
     productName={item.productName}
     productPrice={item.productPrice}

    />
   );
  }

  // if user input is populated
  if (item.productName.toLowerCase().includes(userText.toLowerCase())) {
   return (
    <ProductCard
     image={item.image}
     productName={item.productName}
     productPrice={item.productPrice}

    />
   )
  }
  else {
   <Text>Does not exist!!!!!!!</Text>
  }
 }
 return (
  <View style={styles.menuContainer}>
   <SafeAreaView>
    <TextInput
     style={styles.input}
     onChangeText={(text)=>setUserText(text)}
     value={userText}
     placeholder="Search"
    />
   </SafeAreaView>
   <SafeAreaView style={{ flex: 1 }}>
    <FlatList
     
     numColumns={2}
     showsVerticalScrollIndicator={false}
     horizontal={false}
     data={ProductItems}
     keyExtractor={(item, index) => 'key' + index}
     renderItem={({ item }) => (
      filterItem(item)
     )}
    />
   </SafeAreaView>
  </View>
 )
}
const styles = StyleSheet.create({
 menuContainer: {
  flex: 1,
  backgroundColor: "#F9F9F9",
  alignItems:'center'
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