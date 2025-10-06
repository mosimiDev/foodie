import React from 'react';
import {  Pressable, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


export default function OnBoardScreen() {

 
  const navigation = useNavigation();


 
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}
      >
        <StatusBar style={'light'} />
        <View style={{ height: 400 }}>
          <Image source={require("../assets/OnBoardImg.png")}
            style={{
              width: "100%", 
              resizeMode: "contain",
              top: -250
            }} />
        </View>
        <View>
          <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: "center", color: "#fff", bottom: -20 }}>Foodie</Text>
          <Text style={{ fontSize: 15, color: "#fff", textAlign: "center", bottom: -23, paddingBottom: 30 }}>Marketplace for your delicious packaged food</Text>
        </View>
        <View>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#FF3C00' : '#DB3C25',
              },
              styles.btn,
            ]}
            onPress={()=>navigation.navigate("Homepage",)}
          >
            <Text style={{ color: 'white' }}>Get Started</Text>
          </Pressable>

        </View>
      </SafeAreaView>
    );


  
  
}
const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    justifyContent: 'center'
  },
  btn:{
  color: '#DB3C25',
  borderRadius: 10,
  width: 200,
  padding: 12,
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 20,
  }, 
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },


})