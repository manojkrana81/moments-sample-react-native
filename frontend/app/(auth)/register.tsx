import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { MoText, MoInput, MoButton } from '../../src/components';
import { colors } from '../../src/theme';

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
          <MoText variant="h2" color="brand" style={s.logo}>Moments</MoText>
          <MoText variant="small" color="muted" style={s.tagline}>Create your account</MoText>
          <View style={s.line} />
          <View style={s.form}>
            <MoInput testID="reg-email" placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" icon="mail-outline" />
            <MoInput testID="reg-fullname" placeholder="Full Name" value={fullName} onChangeText={setFullName} icon="person-outline" />
            <MoInput testID="reg-username" placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" icon="at-outline" />
            <MoInput testID="reg-password" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry icon="lock-closed-outline" />
            <MoButton testID="register-btn" title={loading ? 'Creating...' : 'Sign Up'} onPress={handleRegister} loading={loading} disabled={loading} />
            <View style={s.divider}><View style={s.divLine} /><MoText variant="caption" color="muted">OR</MoText><View style={s.divLine} /></View>
            <MoButton testID="login-link" title="Already have an account? Log in" onPress={() => router.back()} variant="ghost" />
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
  logo: { fontStyle: 'italic' },
  tagline: { marginTop: 8, letterSpacing: 1 },
  line: { width: 40, height: 2, backgroundColor: colors.brand.primary, marginVertical: 28, borderRadius: 1 },
  form: { width: '100%', maxWidth: 400 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 16 },
  divLine: { flex: 1, height: 1, backgroundColor: colors.border.default },
});
