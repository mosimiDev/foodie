import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { withAccelerate } from '@prisma/extension-accelerate'

import MenuScreen from './app/screens/MenuScreen';
import CartScreen from './app/screens/CartScreen';
import OnBoardScreen from './app/screens/OnBoardScreen';
import AccountScreen from './app/screens/AccountScreen';
import ProductDetailsScreen from './app/screens/ProductDetailScreen';
import BottomTab from './app/components/layouts/BottomTab';
import Register from './app/screens/Register';
import Login from './app/screens/Login';
import { persistor, store } from './app/store/store';
import { AuthProvider } from './app/context/AuthContext';
import { useAuth } from './app/context/AuthContext';


const Stack = createNativeStackNavigator();

// export default function App() {
// return(
//   <AuthProvider>
//     <Layout></Layout>
//   </AuthProvider>
// );
// }

// export const Layout = () => {
// const {authState, onLogout} = useAuth();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {authState?.authenticated ?
// <Stack.Screen name="Homepage" component={BottomTab} options={{ gestureEnabled: false }} />
//          :
//          <>
//          <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
//          </>

// }
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }


export default function App() {




  return (

    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}
export const Layout = () => {
const {user, loading} = useAuth();
   return(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar />

          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
            >
              {user?
              <>
              <Stack.Screen name="Homepage" component={BottomTab} options={{ gestureEnabled: false }} />
              <Stack.Screen name="Menu" component={MenuScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
              <Stack.Screen name="Account" component={AccountScreen} />
              <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
              </> :
              <>
              <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              </>
              }
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
   )
}
