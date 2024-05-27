import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, ScrollView, TextInput, Text, View, FlatList } from 'react-native';
import ProductCard from '../components/shared/ProductCard';
import { ProductItems } from '../components/shared/ProductItems';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './allroutes';
import { Feather } from '@expo/vector-icons';

type MenuScreenProps = NativeStackScreenProps<RootStackParamList, "MenuScreen">;
export default function MenuScreen({ navigation }: MenuScreenProps) {
  const [userText, setUserText] = React.useState("")


  const filterItem = (item) => {
    if (userText === "") {
      return (
        <ProductCard
          ProductItems={item}
        />
      );
    }

    // if user input is populated
    if (item.productName.toLowerCase().includes(userText.toLowerCase())) {
      return (
        <ProductCard
          ProductItems={item}
        />
      )
    }

  }
  const filteredData = filterItem ? ProductItems.filter(filterItem) : ProductItems;

  return (
    <View style={styles.menuContainer}>
      <StatusBar style="dark" />
      {/* Search Input area */}
      <View style={styles.searchSection}>
        <Feather name="search" size={14} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.input}

          value={userText}
          onChangeText={(text) => setUserText(text)}
          placeholder="Search"
          placeholderTextColor={"grey"}
        />
      </View>
      {/* Product list */}
      <SafeAreaView style={{ flex: 1 }}>
        {filteredData.length === 0 ? (
          <View style={{ paddingTop: 50 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: '#DB3C25', }}>
              OOPS!
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#DB3C25', }}>
              That is not available
            </Text>

            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10 }}>
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
            renderItem={({ item }) => (

              <ProductCard ProductItems={item} />
            )}
          />
        }

      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: 'center'
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 3,

  },
  searchSection: {
    padding: 2,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderBlockColor: "gray",
    alignItems: 'center',
    borderRadius: 15,
  },
  searchIcon: {
    padding: 10,
  }

})