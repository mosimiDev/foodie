import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import ProductDetails from '../../screens/ProductDetailScreen';


export default function ProductCard({ productName, productPrice, image }) {

  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate("ProductDetails" as never,)
  };


  return (

    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#ECECEC' : 'white',
        },
        styles.wrapperCustom,
      ]}
      onPress={onPressHandler}
    >

      {/* Icon plus Product Image Section */}
      <View style={styles.sectionImage}>
        <View style={styles.heartIcon}>
          <Feather name="heart" size={16} color="black" />
        </View>
        <Image
          style={styles.image}
          source={image}
        />
      </View>
      {/*End of Icon plus Product Image Section */}
      {/* Text Section */}
      <View style={styles.sectionText}>
        <Text>{productName}</Text>
        <Text style={styles.priceText}>{productPrice}</Text>
      </View>
      {/*End of Text Section */}

      {/* Add to Cart Button */}
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#FF3C00' : '#DB3C25',
          },
          styles.btnCustom,
        ]}
      >
        <SimpleLineIcons name="bag" size={14} color="white" />
        <Text style={{ color: 'white' }}>Add to cart</Text>
      </Pressable>
    </Pressable>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",

  },
  heartIcon: {
    alignSelf: 'flex-end'
  },
  wrapperCustom: {
    margin: 5,
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    height: 250,
    width: 150


  },
  sectionImage: {

    marginBottom: 20
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    objectFit: 'cover',
    height: 80,
    width: 76,

  },
  sectionText: {
    flexDirection: 'row',
    gap: 8,
    height: 30,
    padding: 5,
    justifyContent: "center",
  },
  priceText: {
    color: '#DB3C25',
  },
  btnCustom: {
    color: '#DB3C25',
    flexDirection: 'row',
    gap: 5,
    borderRadius: 20,
    width: 100,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  }
});