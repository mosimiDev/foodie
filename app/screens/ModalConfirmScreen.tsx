import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Dimensions, Animated, Easing, Text, Pressable } from 'react-native';
import ModalSucessScreen from './ModalSuccessScreen';
import { clearCart } from '../store/cartReducer';
import { useDispatch } from 'react-redux';

export default function ModalConfirmScreen({ visible, options, duration, onClose }) {

  const [successvisible, setSucessVisible] = useState(false);
  const dispatch = useDispatch()

  const handleVisibleModal = () => {
    setSucessVisible(true);
    onClose()

  }

  const handleClose = () => {
    setSucessVisible(false);
  }

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

  const onPress = () => {
    onClose();
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

          <View>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}> Confirm Order</Text>
            <Text style={{ color: "black", marginVertical: 20, fontSize: 18 }}>Are you sure you want to place this order?</Text>
            {/* Buttons section */}
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
              <Pressable onPress={handleVisibleModal} >
                <Text style={{ color: "black" }}>Yes</Text>
              </Pressable>
              <Pressable onPress={onPress} >
                <Text style={{ color: "black" }}>No</Text>
              </Pressable>

            </View>
            {/*End of Buttons section */}
          </View>
        </View>

      </Animated.View>
      <ModalSucessScreen

        visible={successvisible}
        options={{ type: 'slide', from: 'top' }}
        duration={500}
        onClose={handleClose} />
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
    backgroundColor: '#c7c4bf',
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
    height: '70%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
  },
  closeIcon: {
    alignSelf: 'flex-end'
  }
})