import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import AccountScreen from './screens/AccountScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from './screens/ProductDetailScreen';
import { store } from "./store/store";
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline";
          } else if (route.name === "Menu") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#DB3C25",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerStyle: { backgroundColor: "#F9F9F9" } }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{ headerStyle: { backgroundColor: "#F9F9F9" } }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerStyle: { backgroundColor: "#F9F9F9" } }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerStyle: { backgroundColor: "#F9F9F9" } }}
      />
    </Tab.Navigator>
  );
}
export default function App() {

  return (

    <Provider store={store}>
      <StatusBar />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="Menu" component={Tabs} />
            <Stack.Screen name="Cart" component={Tabs} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB38A",
    alignItems: "center",
    paddingTop: 72,
  },

});

{/* <View style={styles.container}>
      <StatusBar style="dark" />
      <Home/>
    </View> */}