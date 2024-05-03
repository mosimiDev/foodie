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
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  const [userInput, setUserInput] = React.useState("")



  const filterData = (item) => {
    // if input is empty
    if (userInput === "") {
      return (
        <ProductCard
          ProductItems={item}

        />
      );
    }

    // if user input is populated
    if (item.productName.toLowerCase().includes(userInput.toLowerCase())) {
      return (
        <ProductCard
          ProductItems={item}

        />
      )
    }


  }
  const filteredData = filterData ? ProductItems.filter(filterData) : ProductItems;

  return (
    <View style={styles.homeContainer}>
      <StatusBar style="dark" />
      {/* Search Input area */}
      <SafeAreaView>
        <Feather name="search" size={24} color="black" />
        <TextInput
          style={styles.input}

          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          placeholder="Search"
        />
      </SafeAreaView>
      {/* Product list */}
      <SafeAreaView style={{ flex: 1, }}>
        {filteredData.length === 0 ? (
          <View style={{ paddingTop:50}}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: '#DB3C25', }}>
              OOPS!
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#DB3C25', }}>
              That is not available
            </Text>
            
            <Text style={{ fontSize: 20, textAlign: 'center', marginTop:10 }}>
              Try searching for something else
            </Text>
          </View>
        ) :
          <FlatList

            numColumns={2}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            data={filteredData}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => <ProductCard ProductItems={item} />}
          />
        }


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