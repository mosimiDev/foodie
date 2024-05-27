import { View, Pressable, Image, Text, StyleSheet, FlatList } from "react-native"
import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartReducer'
import { useNavigation } from "@react-navigation/native"
import { SimpleLineIcons } from '@expo/vector-icons'
import ProductCard from "../components/shared/ProductCard"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AppButton from "../components/shared/AppButton"

interface FavouriteProps {
 Product: any;
}

export default function Favourite({ Product }: FavouriteProps) {
 const navigation = useNavigation();
 const dispatch = useDispatch();

 return (
  <View style={styles.Container}>
   {Product.length > 0 ? (
    <FlatList
     showsVerticalScrollIndicator={false}
     data={Product}
     keyExtractor={(item) => item.productName}
     renderItem={({ item }) => (
      <ProductCard ProductItems={Product} />
     )}
    />
   ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <MaterialCommunityIcons name="cart-remove" size={50} color="black" />
     <Text style={{ fontSize: 20, marginTop: 10 }}>
      No Item Has Been Added To Your Favourites.
     </Text>
     <AppButton
      text='Go To Menu'
      onPress={() => navigation.navigate("Home")}
     />
    </View>
   )}
  </View>
  )}
const styles = StyleSheet.create({
 Container: {
  flex: 1,
  backgroundColor: "#F9F9F9"
 }
})