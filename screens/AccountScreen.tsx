import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';




export default function AccountScreen() {
 return (
  <View style={styles.accountContainer}>
   {/* User Icon */}
   <View style={{ margin: 30, alignSelf: 'flex-end' }}>
    <Ionicons name="people-circle-outline" size={24} color="black" />
   </View>
   {/*End of User Icon */}


   {/* Account Verification section */}
   <View style={styles.accVerSection}>
    <MaterialCommunityIcons name="check-decagram" size={24} color="black" />
    <Text style={{fontSize:20}}>Account Verification</Text>
    <Text style={{ color: 'green', backgroundColor:'rgba(221,255,221,0.2)', marginLeft:100, padding:5 }}>Verified</Text>
   </View>
   {/*End of Account Verification section */}


   {/* Beneficiaries section */}
   <View style={styles.accVerSection}>
    <Feather name="crosshair" size={24} color="black" />
    <Text style={{ fontSize: 20 }}>Beneficiaries</Text>
   </View>
   {/*  End of Beneficiaries section */}

   {/* Notification section */}
   <View style={styles.accVerSection}>
    <Entypo name="bell" size={24} color="black" />
    <Text style={{ fontSize: 20 }}>Notification</Text>
   </View>
   {/*End of Notification section */}
   
   {/* Refferals section */}
   <View style={styles.accVerSection}>
    <Ionicons name="people-circle-outline" size={24} color="black" />
    <Text style={{ fontSize: 20 }}>Refferals</Text>
   </View>
   {/*End of Refferals section */}

   {/* Change password section */}
   <View style={styles.accVerSection}>
    <MaterialCommunityIcons name="onepassword" size={24} color="black" />
    <Text style={{ fontSize: 20 }}>Change password</Text>
   </View>
   {/* End of change password section */}

   {/* Change Pin section */}
   <View style={styles.accVerSection}>
    <MaterialIcons name="fiber-pin" size={24} color="black" />
    <Text style={{ fontSize: 20 }}>Change Pin</Text>
   </View>
   {/* End of Change Pin section */}

   {/* Two-factor section */}
   <View style={styles.accVerSection}>
    <Entypo name="lock" size={24} color="black" />
    <Text style={{ fontSize: 20 }}>Two-factor Authentication</Text>
   </View>
   {/*End of Two-factor section */}

   {/*  Biometrics section */}
   <View style={styles.accVerSection}>
    <Ionicons name="finger-print-outline" size={24} color="black" />
    <Text style={{ fontSize: 20 }}>Enable Biometrics</Text>
   </View>
   {/*  End of Biometrics section */}

  </View>
 )
}
const styles = StyleSheet.create({
 accountContainer: {
  flex: 1,
  backgroundColor: "#F9F9F9",
 },
 accVerSection: {
  flexDirection: 'row',
  gap: 15,
  margin: 20,
  marginBottom:30
 }
})