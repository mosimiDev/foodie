import React from 'react';
import { StyleSheet, Text,  Pressable, GestureResponderEvent, } from 'react-native';

type AppBtnProp = {
 text: string;
 onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};
export default function AppButton(props: AppBtnProp) {
 return (
  <Pressable
   style={({ pressed }) => [
    {
     backgroundColor: pressed ? '#FF3C00' : '#DB3C25',
    },
    styles.btnCustom,
   ]}
   onPress={props.onPress}
  >
   <Text style={{ color: 'white' }}>{ props.text}</Text>
  </Pressable>
 )
}
const styles = StyleSheet.create({
 btnCustom: {
  color: '#DB3C25',
  borderRadius: 20,
  width: 100,
  padding: 2,
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 20,
  paddingHorizontal: 1
 }
})