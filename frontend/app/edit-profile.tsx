import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../src/contexts/AuthContext';

export default function EditProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSave = () => {
    if (!fullName.trim() || !username.trim()) { Alert.alert('Error', 'Name and username required'); return; }
    if (user) { updateUser({ ...user, full_name: fullName.trim(), username: username.trim(), bio: bio.trim() }); }
    Alert.alert('Success', 'Profile updated!');
    router.back();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity testID="cancel-edit-btn" onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity testID="save-edit-btn" onPress={handleSave}>
          <Text style={styles.saveText}>Done</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.avatarSection}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitial}>{fullName.charAt(0).toUpperCase() || '?'}</Text>
          </View>
          <Text style={styles.changePhoto}>Change Profile Photo</Text>
        </TouchableOpacity>
        <View style={styles.field}><Text style={styles.label}>Name</Text><TextInput testID="edit-name" style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Full name" placeholderTextColor="#3D5278" /></View>
        <View style={styles.field}><Text style={styles.label}>Username</Text><TextInput testID="edit-username" style={styles.input} value={username} onChangeText={setUsername} placeholder="Username" autoCapitalize="none" placeholderTextColor="#3D5278" /></View>
        <View style={styles.field}><Text style={styles.label}>Bio</Text><TextInput testID="edit-bio" style={[styles.input, styles.bioInput]} value={bio} onChangeText={setBio} placeholder="Write a bio..." multiline maxLength={150} placeholderTextColor="#3D5278" /></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1628' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  cancelText: { fontSize: 16, color: '#3D5278' },
  saveText: { fontSize: 16, color: '#D4AF37', fontWeight: '700' },
  content: { padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 28 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#D4AF37', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarInitial: { fontSize: 32, fontWeight: '700', color: '#0A1628' },
  changePhoto: { color: '#D4AF37', fontSize: 14, fontWeight: '600' },
  field: { marginBottom: 20 },
  label: { fontSize: 13, color: '#6B82A6', marginBottom: 6, fontWeight: '600' },
  input: { borderBottomWidth: 1, borderBottomColor: '#E8ECF0', paddingVertical: 10, fontSize: 16, color: '#FFFFFF' },
  bioInput: { minHeight: 60, textAlignVertical: 'top' },
});
