import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Dimensions, Animated, Easing, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { clearCart } from '../store/cartReducer';
import { useDispatch } from 'react-redux';




export default function ModalSucessScreen({ visible, options, duration, onClose }) {
 const dispatch = useDispatch()
 
 const pulseAnim = useRef(new Animated.Value(0)).current;
 const { height } = Dimensions.get('screen');
 const startPointY = options?.from === 'top' ? -height : height;
 const transY = useRef(new Animated.Value(startPointY));

 useEffect(() => {
  if (visible) {
   startAnimation(0);
  } else {
   startAnimation(startPointY);
  }
 }, [visible]);

 const startAnimation = (toValue) => {
  Animated.timing(transY.current, {
   toValue,
   duration,
   easing: Easing.inOut(Easing.ease),
   useNativeDriver: true
  }).start();
 }

 const clearCartItems = () => {
  dispatch(clearCart())
 }

 const onPress = () => {
  onClose();
  clearCartItems();
 }

 const generateBackgroundOpacity = () => {
  if (startPointY >= 0) {
   return transY.current.interpolate({
    inputRange: [0, startPointY],
    outputRange: [0.8, 0],
    extrapolate: 'clamp'
   })
  } else {
   return transY.current.interpolate({
    inputRange: [startPointY, 0],
    outputRange: [0, 0.8],
    extrapolate: 'clamp'
   })
  }
 }

 return (
  <>
   <Animated.View pointerEvents='none' style={[styles.outerContainer, { opacity: generateBackgroundOpacity() }]} />
   <Animated.View style={[styles.container, { transform: [{ translateY: transY.current }] }]}>
    <View style={styles.innerContainer}>
     <Animated.View
      style={[
       styles.fadingContainer,
       {
        opacity: pulseAnim,
       },
      ]}>
      
     </Animated.View>
     <Pressable onPress={onPress} style={{ alignSelf: 'flex-end', paddingRight:10, bottom:30 }}>
      <Ionicons name="close" size={20} color="black" />
     </Pressable>
     
     
     <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}> Sucess</Text>
     <Feather name="check-circle" size={24} color="green" />
     <Text style={{ color: "black", marginVertical: 20, fontSize: 18 }}> Order Placed. We will contact you soon</Text>
     
     
    </View>
   </Animated.View>
  </>
 )
}

const styles = StyleSheet.create({
 outerContainer: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#2b4369',
 },
 container: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center'
 },
 innerContainer: {
  width: '70%',
  height: '50%',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20
 },
 fadingContainer: {
  padding: 20,
  
 },
})