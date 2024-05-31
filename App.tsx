import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import OnBoardScreen from './screens/OnBoardScreen';
import AccountScreen from './screens/AccountScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from './screens/ProductDetailScreen';
import BottomTab from './components/layouts/BottomTab';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
 
 
  

  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <SafeAreaProvider>
      <StatusBar />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
              <Stack.Screen name="Homepage" component={BottomTab} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Cart" component={CartScreen}  />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
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