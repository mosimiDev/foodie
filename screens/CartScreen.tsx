import React, { useState,useCallback} from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import NewOrder from '../components/shared/NewOrder';
import { MaterialIcons } from '@expo/vector-icons';
import AppButton from '../components/shared/AppButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addItem, removeItem } from '../store/cartReducer';
import { ProductItems } from '../components/shared/ProductItems';
import OrderList from '../components/shared/OrderList';
import ModalConfirmScreen from './ModalConfirmScreen';

export default function CartScreen({ navigation }) {
     const [visible, setVisible] = useState(false);

     const dispatch = useDispatch()

     const handleItemAdd = (item) => {
          dispatch(addItem(item))
     }
     const handleItemRemove = (item) => {
          dispatch(removeItem(item))
     }

     const { items } = useSelector((state: RootState) => state.cart);
     const totalSum = items.reduce((acc, item) => acc + item.sum, 0);


     const handleOrderPress = useCallback(() => {
          if (items.length < 0) {
               Alert.alert('Empty Order', 'Please Add An Order To Continue', [{ text: 'OK' }], {
                    cancelable: false,
               });
          } else {
               
               setVisible(true);
          }
     }, []);


     const handleVisibleModal = () => {
          setVisible(true);
     }

     const handleClose = () => {
          setVisible(false);
     }

     
     return (
          <SafeAreaView style={styles.cartContainer}>

               {items.length > 0 ?  (
                    <View style={{ flex: 1, paddingBottom: 100 }}>
                         
                         {/* List items section */}
                         <View >
                              <OrderList onAdd={(item) => handleItemAdd(item)}
                                   onRemove={(item) => handleItemRemove(item)}
                                   deletable
                                   addable />

                         </View>
                         {/* Lower Layout plus Button */}
                         <View>
                              <View style={{ flexDirection: "row", justifyContent: "space-between", width: "70%", marginHorizontal: 30 }}>
                                   <Text>Total(<Text style={{ color: "gray" }}>{items.length} items</Text>)</Text>
                                   <Text>£{totalSum}</Text>
                              </View>

                              <Pressable onPress={handleOrderPress} style={({ pressed }) => [
                                   {
                                        backgroundColor: pressed ? '#FF3C00' : '#DB3C25',
                                   },
                                   styles.Checkoutbtn,
                              ]}>
                                   <Text style={{ color: "#fff" }}>Checkout- <Text>£{totalSum}</Text></Text>
                              </Pressable>
                         </View>
                         {/*End of Lower Layout plus Button */}
                         {/* Modal section */}
                         <ModalConfirmScreen
                              visible={visible}
                              options={{ type: 'slide', from: 'top' }}
                              duration={500}
                              onClose={handleClose} />
                    </View>
               ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                         <MaterialCommunityIcons name="cart-remove" size={50} color="black" />
                         <Text style={{ fontSize: 20, marginTop: 10 }}>No Item Has Been Added To Your Cart.</Text>
                         <AppButton text='Go To Menu' onPress={() => navigation.navigate("Home")} />
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