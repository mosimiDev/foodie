import React from 'react';

import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import OnBoardScreen from './screens/OnBoardScreen';
import AccountScreen from './screens/AccountScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from './screens/ProductDetailScreen';
import BottomTab from './components/layouts/BottomTab';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();


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

