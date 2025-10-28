
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";


type Form = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const [form, setForm] = useState<Form>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<Form>>({});
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);

    const navigation = useNavigation();

  const validate = (): boolean => {
    const e: Partial<Form> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!emailRegex.test(form.email)) e.email = 'Enter a valid email';

    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Use 8+ characters';

    if (!form.confirmPassword) e.confirmPassword = 'Confirm your password';
    else if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords don't match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (key: keyof Form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    try{
      const payload = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      };
      const res = await axios.post("https://foodie-s320.onrender.com", payload);

      const createdName = res.data?.user?.fullName || form.fullName || res.data?.user?.email;
      Alert.alert("Account created", `Welcome, ${createdName}!`, [{ text: "OK" }]);
      navigation.navigate("Login");
      
      
    }
    catch(err: any){
     const message =
        err?.response?.data?.message ||
        err?.response?.data?.error 
       
    }
    finally {
      setLoading(false);
    }

    // Replace this with real API call (fetch/axios). Keep here as an example only.
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Account created', `Welcome, ${form.fullName}!`, [{ text: 'OK' }]);
      // Optionally clear form or navigate away
      setForm({ fullName: '', email: '', password: '', confirmPassword: '' });
    }, 1200);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Quick, secure sign up — start using the app in seconds.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              value={form.fullName}
              onChangeText={v => onChange('fullName', v)}
              placeholder="Jane Doe"
              style={[styles.input, errors.fullName && styles.inputError]}
              returnKeyType="next"
              accessible
              accessibilityLabel="Full name"
            />
            {errors.fullName ? <Text style={styles.error}>{errors.fullName}</Text> : null}

            <Text style={styles.label}>Email</Text>
            <TextInput
              value={form.email}
              onChangeText={v => onChange('email', v)}
              keyboardType="email-address"
              placeholder="you@example.com"
              autoCapitalize="none"
              style={[styles.input, errors.email && styles.inputError]}
              returnKeyType="next"
              accessible
              accessibilityLabel="Email address"
            />
            {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

            <Text style={styles.label}>Password</Text>
            <View style={styles.row}> 
              <TextInput
                value={form.password}
                onChangeText={v => onChange('password', v)}
                placeholder="Create a password"
                secureTextEntry={secure}
                style={[styles.input, styles.flexInput, errors.password && styles.inputError]}
                returnKeyType="next"
                accessible
                accessibilityLabel="Password"
              />
              <TouchableOpacity
                onPress={() => setSecure(s => !s)}
                style={styles.toggle}
                accessibilityRole="button"
                accessibilityLabel={secure ? 'Show password' : 'Hide password'}
              >
                <Text style={styles.toggleText}>{secure ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

            <Text style={styles.label}>Confirm password</Text>
            <TextInput
              value={form.confirmPassword}
              onChangeText={v => onChange('confirmPassword', v)}
              placeholder="Re-enter password"
              secureTextEntry={secure}
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              returnKeyType="done"
              accessible
              accessibilityLabel="Confirm password"
            />
            {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={onSubmit}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Create account"
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>Create account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity accessibilityRole="button" onPress={()=>navigation.navigate("Login")}>
                <Text style={styles.footerLink}> Sign in</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.small}>By creating an account you agree to our Terms of Service and Privacy Policy.</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { padding: 24, flex: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: '#555', marginBottom: 18 },
  form: { marginTop: 6 },
  label: { fontSize: 13, color: '#333', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: '#e53935' },
  error: { color: '#e53935', marginTop: 6, fontSize: 13 },
  button: {
    marginTop: 20,
    backgroundColor: '#DB3C25',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  footerText: { color: '#666' },
  footerLink: { color: '#0066ff', fontWeight: '600' },
  small: { fontSize: 12, color: '#888', marginTop: 18, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  toggle: { paddingHorizontal: 10 },
  toggleText: { color: '#0066ff', fontWeight: '600' },
  flexInput: { flex: 1 },
});
