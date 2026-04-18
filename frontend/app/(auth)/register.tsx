import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { C } from '../../src/theme/colors';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !username || !fullName || !password) { Alert.alert('Error', 'Please fill in all fields'); return; }
    if (password.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return; }
    setLoading(true);
    try { await register(email, username, password, fullName); router.replace('/(tabs)/home'); }
    catch (e: any) { Alert.alert('Registration Failed', e.message); }
    finally { setLoading(false); }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.content}>
          <Text style={s.logo}>Moments</Text>
          <Text style={s.tagline}>Create your account</Text>
          <View style={s.goldLine} />
          <View style={s.form}>
            <TextInput testID="reg-email" style={s.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholderTextColor={C.textMuted} />
            <TextInput testID="reg-fullname" style={s.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} placeholderTextColor={C.textMuted} />
            <TextInput testID="reg-username" style={s.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" placeholderTextColor={C.textMuted} />
            <TextInput testID="reg-password" style={s.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor={C.textMuted} />
            <TouchableOpacity testID="register-btn" style={[s.btn, loading && s.btnOff]} onPress={handleRegister} disabled={loading}>
              <Text style={s.btnText}>{loading ? 'Creating...' : 'Sign Up'}</Text>
            </TouchableOpacity>
            <View style={s.divider}><View style={s.line} /><Text style={s.divText}>OR</Text><View style={s.line} /></View>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={s.link}>Already have an account? <Text style={s.linkGold}>Log in</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { flexGrow: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  logo: { fontSize: 42, fontWeight: '700', color: C.gold, fontStyle: 'italic' },
  tagline: { fontSize: 14, color: C.textMuted, marginTop: 8, letterSpacing: 1 },
  goldLine: { width: 40, height: 2, backgroundColor: C.gold, marginVertical: 28, borderRadius: 1 },
  form: { width: '100%', maxWidth: 400 },
  input: { backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 16, marginBottom: 12, fontSize: 16, color: C.text },
  btn: { backgroundColor: C.gold, borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  btnOff: { opacity: 0.6 },
  btnText: { color: C.bg, fontSize: 16, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  line: { flex: 1, height: 1, backgroundColor: C.border },
  divText: { marginHorizontal: 16, color: C.textMuted, fontSize: 13 },
  link: { textAlign: 'center', color: C.textMuted, fontSize: 14 },
  linkGold: { color: C.gold, fontWeight: '600' },
});
