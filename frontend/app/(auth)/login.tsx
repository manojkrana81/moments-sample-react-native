import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { MoText, MoInput, MoButton } from '../../src/components';
import { colors } from '../../src/theme';

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
          <MoText variant="h1" color="brand" style={s.logo}>Moments</MoText>
          <MoText variant="small" color="muted" style={s.tagline}>Premium social experience</MoText>
          <View style={s.line} />
          <View style={s.form}>
            <MoInput testID="login-identifier" placeholder="Email, phone or username" value={identifier} onChangeText={setIdentifier} autoCapitalize="none" icon="person-outline" />
            <MoInput testID="login-password" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry icon="lock-closed-outline" />
            <MoButton testID="login-btn" title={loading ? 'Logging in...' : 'Log In'} onPress={handleLogin} loading={loading} disabled={loading} />
            <View style={s.divider}><View style={s.divLine} /><MoText variant="caption" color="muted">OR</MoText><View style={s.divLine} /></View>
            <MoButton testID="signup-link" title="Create an account" onPress={() => router.push('/(auth)/register')} variant="outline" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary },
  scroll: { flexGrow: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  logo: { fontStyle: 'italic', letterSpacing: 1 },
  tagline: { marginTop: 8, letterSpacing: 2 },
  line: { width: 60, height: 2, backgroundColor: colors.brand.primary, marginVertical: 32, borderRadius: 1 },
  form: { width: '100%', maxWidth: 400 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 16 },
  divLine: { flex: 1, height: 1, backgroundColor: colors.border.default },
});
