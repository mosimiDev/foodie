import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen({ navigation }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'profile'
  const {loading,onLogin,user} = useAuth()

  

  const handleSignIn = async () => {
    if (!email || !password)
      return Alert.alert("Error", "Please enter your email and password");

    try{
      const u = await onLogin?.( email, password );
      setMode('profile');
      navigation.navigate("Homepage");
    }
    // try {
    //   const res = await axios.post("https://foodie-s320.onrender.com", form);
    //   Alert.alert("Welcome Back!", `Hello ${res.data.user.fullName}!`);
    //   // TODO: store JWT token or navigate to home screen
    // }
    catch (err) {
      Alert.alert(
        "Login Failed",
        JSON.stringify(err.response?.data || err.message)
      );
    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back </Text>
      <Text style={styles.subtitle}>Sign in to continue to Foodie</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 10 },
  subtitle: { color: "#555", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#DB3C25",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  link: { color: "#007bff", fontWeight: "bold" },
});








// const login = async () => {
//         const result = await onLogin?.(email, password);
//         if (result && result.error) {
//             alert(result.msg);
//         }
//     };

//     // call login after successful registration
//     const register= async () =>{
//         const result = await onRegister?.(email, password);
//         if (result && result.error){
//             alert(result.msg);
//         } else {
//              login();
//         }
//     }