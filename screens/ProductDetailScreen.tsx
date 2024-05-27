import React, { useState } from 'react';
import { Image, Pressable,Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartReducer';



const windowWidth = Dimensions.get('window').width;

export default function ProductDetailsScreen({ navigation, route }) {

  const item = route.params;
  const dispatch = useDispatch()


  
// Dropdown Area
  const ExpandableItem = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    
    return (
      <View style={{
        marginVertical: 10,
      }}>
        <Pressable onPress={toggleExpand}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between" }}>
            <Text style={{ fontSize: 18 }}>{title}</Text>
            <MaterialIcons name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} />
          </View>
        </Pressable>
        {expanded && <Text style={{ fontSize: 15, marginTop:8 }}> {content}</Text>}
      </View>
    );
  };

  //End of Dropdown Area

  // Alert Function

  const AddToCartAlert = () =>
    Alert.alert(
      "Added to Cart",
      "This Item has been added to cart",
      [
        {
          text: "Go To Cart",
          onPress: () => navigation.navigate("Cart"),
          style: "cancel",
        },
        { text: "Continue Shopping" },

      ],
      { cancelable: false }
    );


  return (
    <SafeAreaView>
      <View style={{marginVertical:20, marginLeft:15, backgroundColor:"#fff", width:35 ,borderRadius:5}}>
        <MaterialIcons name="keyboard-arrow-left" size={30} color="black" onPress={navigation.goBack} />
      </View>
      <ScrollView key={item.id} style={{marginBottom:100}}>
        {/*Details Title x Price */} 
        {/* Swiper Area */}
        <View>
          <Swiper style={styles.wrapper} activeDotColor="#FF3C00" showsButtons={false}>
            <View style={styles.slide1}>
              <Image
                source={item.image}
                style={ styles.productImg }
              />
            </View>
            <View style={styles.slide2}>
              <Image
                source={item.image}
                style={styles.productImg}
              />
            </View>
            <View style={styles.slide3}>
              <Image
                source={item.image}
                style={styles.productImg}
              />
            </View>
          </Swiper>
        
        </View>
        {/* End of Swiper Area */}
        {/* Text Area */}
        <View style={styles.textSection}>
        <View style={{flexDirection:"row",  width:"50%",marginBottom:10}}>
            <Text style={{ fontSize: 22, fontWeight: '400',  }} >{item.productName}</Text>
            <Text style={{ fontSize: 20,color:"#FF3C00", paddingTop:1, marginLeft:10}}>£{item.productPrice}</Text>
        </View>
        {/*End of Details Title x Price */}
        {/* Details Description */}
        <View>
          <Text style={{lineHeight:20}}>{item.productDesc}</Text>
        </View>
        {/*End of Details Description */}
        {/* Ingredients */}
        <View style={{marginTop:35}}>
          <ExpandableItem title="Ingredients" content="This is Ingredients content." />
        </View>
        {/* Nutritional Information */}
        <View>
          <ExpandableItem title="Nutritional Information" content="This is Nutritional Information content." />
        </View>
        {/* How to Prepare */}
        <View>
          <ExpandableItem title="How to Prepare " content="This is How to Prepare content." />
        </View>
        {/* Dietary Information */}
        <View>
          <ExpandableItem title="Dietary Information " content="This is Dietary Information content." />
        </View>
        {/* Storage Information */}
        <View>
          <ExpandableItem title="Storage Information" content="This is Storage Information content." />
        </View>
        {/* Extra */}
        <View>
          <ExpandableItem title=" Extra " content="This is Extra content." />
        </View>

        {/* Counter */}
          <View style={{ flexDirection: "row", marginTop:70,  justifyContent: "space-between", width: "90%", marginBottom: 20, marginHorizontal: 10 }}>
            <View style={{ backgroundColor: "#fff", width: 30, borderRadius: 5, padding: 5}}><Entypo name="minus" size={20} color="black" /></View>
            
            <Text style={{fontSize:18, marginTop:5}}>1</Text>
            <View style={{ backgroundColor: "#fff", width: 30, borderRadius: 5, padding: 5 }}><Entypo name="plus" size={20} color="black" /></View>
        </View>
          {/* Cart Button */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#FF3C00' : '#DB3C25',
              },
              styles.Cartbtn,
            ]}
            onPress={() => {
              AddToCartAlert();
              dispatch(addItem(item));
            }}
            // onPress={() => navigation.navigate("Cart")}
          >
            <Text style={{ color: 'white' }}>Add to cart</Text>
          </Pressable>

          {/* Subscribe button */}
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#FF3C00' : '#DB3C25',
              },
              styles.Subbtn,
            ]}
            onPress={() => {
              alert("subscribed to a plan")
            }}
          >
            <Text style={{ color: '#DB3C25' }}>Subscribe to a Plan</Text>
          </Pressable>
        

        </View>
      </ScrollView>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  // detailsContainer: {
  //   flex: 1,
  //   backgroundColor: "#F9F9F9",
  // },
  wrapper: {
    height: 300,
  },
  productImg: {
    width: 250,
    height:10,
    flex:1,
    objectFit:"cover"
  },
  slide1: {
    width: "80%",
    marginHorizontal:30,
    height:250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  slide2: {
    width: "80%",
    marginHorizontal: 30,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  slide3: {
    width: "80%",
    marginHorizontal: 30,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  textSection: {
    marginHorizontal:20,
    width:"80%"
  },
  Cartbtn: {
    color: '#DB3C25',
    borderRadius: 20,
    width: 300,
    padding: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  Subbtn: {
    backgroundColor: '#fff',
    borderColor: '#DB3C25',
    borderWidth: 1,
    borderRadius: 20,
    width: 300,
    padding: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  }

})

