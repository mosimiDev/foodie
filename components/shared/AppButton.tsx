import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

type AppBtnProp = {
 text: string;
};
export default function AppButton(props: AppBtnProp) {
 return (
  <Pressable
   style={({ pressed }) => [
    {
     backgroundColor: pressed ? 'rgba(210, 230, 255, 0.4)' : '#DB3C25',
    },
    styles.btnCustom,
   ]}
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
  padding: 10,
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 20,
 }
})