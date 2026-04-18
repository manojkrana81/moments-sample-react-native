import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../src/theme/colors';

export default function ChangePassword() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSave = () => {
    if (!current || !newPwd || !confirm) { Alert.alert('Error', 'Please fill all fields'); return; }
    if (newPwd.length < 6) { Alert.alert('Error', 'New password must be at least 6 characters'); return; }
    if (newPwd !== confirm) { Alert.alert('Error', 'Passwords do not match'); return; }
    Alert.alert('Success', 'Password changed successfully');
    router.back();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Change Password</Text><View style={{ width: 24 }} /></View>
      <View style={s.content}>
        <View style={s.infoBox}><Ionicons name="shield-checkmark-outline" size={22} color={C.navy} /><Text style={s.infoText}>Your password must be at least 6 characters and include a mix of letters and numbers.</Text></View>
        <Text style={s.label}>Current Password</Text>
        <View style={s.inputRow}><TextInput testID="current-pwd" style={s.input} placeholder="Enter current password" value={current} onChangeText={setCurrent} secureTextEntry={!showCurrent} placeholderTextColor={C.textDim} /><TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}><Ionicons name={showCurrent ? 'eye-off' : 'eye'} size={20} color={C.textDim} /></TouchableOpacity></View>
        <Text style={s.label}>New Password</Text>
        <View style={s.inputRow}><TextInput testID="new-pwd" style={s.input} placeholder="Enter new password" value={newPwd} onChangeText={setNewPwd} secureTextEntry={!showNew} placeholderTextColor={C.textDim} /><TouchableOpacity onPress={() => setShowNew(!showNew)}><Ionicons name={showNew ? 'eye-off' : 'eye'} size={20} color={C.textDim} /></TouchableOpacity></View>
        <Text style={s.label}>Confirm New Password</Text>
        <View style={s.inputRow}><TextInput testID="confirm-pwd" style={s.input} placeholder="Re-enter new password" value={confirm} onChangeText={setConfirm} secureTextEntry placeholderTextColor={C.textDim} /></View>
        <TouchableOpacity testID="save-pwd-btn" style={s.btn} onPress={handleSave}><Text style={s.btnText}>Update Password</Text></TouchableOpacity>
        <TouchableOpacity style={s.forgotBtn}><Text style={s.forgotText}>Forgot password?</Text></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  content: { padding: 20 },
  infoBox: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: C.surface, borderRadius: 12, marginBottom: 24, borderWidth: 1, borderColor: C.border },
  infoText: { flex: 1, fontSize: 13, color: C.textMuted, lineHeight: 18 },
  label: { fontSize: 13, fontWeight: '600', color: C.textMuted, marginBottom: 8, marginTop: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, borderRadius: 10, paddingHorizontal: 14, marginBottom: 16, borderWidth: 1, borderColor: C.border },
  input: { flex: 1, paddingVertical: 14, fontSize: 16, color: C.text },
  btn: { backgroundColor: C.navy, borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  forgotBtn: { alignItems: 'center', marginTop: 16 },
  forgotText: { color: C.accent, fontSize: 14, fontWeight: '500' },
});
