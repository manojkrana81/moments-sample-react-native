import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { C } from '../../src/theme/colors';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!identifier || !password) { Alert.alert('Error', 'Please fill in all fields'); return; }
    setLoading(true);
    try { await login(identifier, password); router.replace('/(tabs)/home'); }
    catch (e: any) { Alert.alert('Login Failed', e.message); }
    finally { setLoading(false); }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.content}>
          <Text style={s.logo}>Moments</Text>
          <Text style={s.tagline}>Premium social experience</Text>
          <View style={s.goldLine} />
          <View style={s.form}>
            <TextInput testID="login-identifier" style={s.input} placeholder="Email, phone or username" value={identifier} onChangeText={setIdentifier} autoCapitalize="none" placeholderTextColor={C.textMuted} />
            <TextInput testID="login-password" style={s.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor={C.textMuted} />
            <TouchableOpacity testID="login-btn" style={[s.btn, loading && s.btnOff]} onPress={handleLogin} disabled={loading}>
              <Text style={s.btnText}>{loading ? 'Logging in...' : 'Log In'}</Text>
            </TouchableOpacity>
            <View style={s.divider}><View style={s.line} /><Text style={s.divText}>OR</Text><View style={s.line} /></View>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={s.link}>Don't have an account? <Text style={s.linkGold}>Sign up</Text></Text>
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
  logo: { fontSize: 48, fontWeight: '700', color: C.gold, fontStyle: 'italic', letterSpacing: 1 },
  tagline: { fontSize: 14, color: C.textMuted, marginTop: 8, letterSpacing: 2, textTransform: 'uppercase' },
  goldLine: { width: 60, height: 2, backgroundColor: C.gold, marginVertical: 32, borderRadius: 1 },
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
