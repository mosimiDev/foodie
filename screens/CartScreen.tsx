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
import Modal from './ModalSuccessScreen';

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
          if (items.length < 1) {
               Alert.alert('Empty Order', 'Please Add An Order To Continue', [{ text: 'OK' }], {
                    cancelable: false,
               });
          } else {
               Alert.alert(
                    'Confirm Order',
                    'Are you sure you want to place this order?',
                    [
                         { text: 'Yes' },
                         { text: 'No' },
                    ],
               );
               // navigation.navigate('OrdersScreen');
               setVisible(true);
          }
     }, []);


     const handleVisibleModal = () => {
          setVisible(true);
     }

     const handleClose = () => {
          setVisible(false);
     }

     // console.log(items)
          // const orderExists = items ? ProductItems.filter(items) : ProductItems;
     
     return (
          <SafeAreaView style={styles.cartContainer}>

               {items.length > 0 ?  (
                    <View style={{ paddingBottom: 300 }}>
                         <View style={{ marginVertical: 20, marginLeft: 15, backgroundColor: "#fff", width: 35, borderRadius: 5 }}>
                              <MaterialIcons name="keyboard-arrow-left" size={30} color="black" onPress={navigation.goBack} />
                         </View>
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
                         <Modal
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