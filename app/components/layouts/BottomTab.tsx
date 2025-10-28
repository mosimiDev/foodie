import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import MenuScreen from '../../screens/MenuScreen';
import CartScreen from '../../screens/CartScreen';
import AccountScreen from '../../screens/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  useSelector } from 'react-redux';
import { RootState } from '../../store/store';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function BottomTab() {

 const { items } = useSelector((state: RootState) => state.cart)
 return (
  <Tab.Navigator
   screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === "Home") {
      iconName = focused ? "home" : "home-outline";
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
    options={{
     headerStyle: { backgroundColor: "#F9F9F9" },
     tabBarBadge: items ? items.length : undefined,
     tabBarBadgeStyle:{backgroundColor:"gray"}
    }}
    
   />
   <Tab.Screen
    name="Account"
    component={AccountScreen}
    options={{ headerStyle: { backgroundColor: "#F9F9F9" } }}
   />
  </Tab.Navigator>
 );
}