import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../src/contexts/AuthContext';
import { C } from '../src/theme/colors';

const Row = ({ icon, label, onPress, danger }: { icon: string; label: string; onPress?: () => void; danger?: boolean }) => (
  <TouchableOpacity testID={`settings-${label.toLowerCase().replace(/\s/g, '-')}`} style={s.row} onPress={onPress}>
    <Ionicons name={icon as any} size={22} color={danger ? C.danger : C.navy} />
    <Text style={[s.rowLabel, danger && s.dangerText]}>{label}</Text>
    <Ionicons name="chevron-forward" size={18} color={C.textDim} />
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: async () => { await logout(); router.replace('/(auth)/login'); } },
    ]);
  };

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity testID="back-settings" onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Settings</Text><View style={{ width: 24 }} /></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={s.section}>Account</Text>
        <Row icon="person-outline" label="Edit Profile" onPress={() => router.push('/edit-profile')} />
        <Row icon="lock-closed-outline" label="Change Password" onPress={() => router.push('/change-password')} />
        <Row icon="shield-outline" label="Privacy" onPress={() => router.push('/privacy-settings')} />
        <Row icon="notifications-outline" label="Notifications" onPress={() => router.push('/notification-preferences')} />
        <Row icon="ban-outline" label="Blocked Users" onPress={() => router.push('/blocked-users')} />

        <Text style={s.section}>Content & Activity</Text>
        <Row icon="time-outline" label="Your Activity" onPress={() => router.push('/user-activity')} />
        <Row icon="bookmark-outline" label="Saved Collections" onPress={() => router.push('/saved-collections')} />
        <Row icon="archive-outline" label="Archive" onPress={() => router.push('/archive')} />
        <Row icon="star-outline" label="Close Friends" onPress={() => router.push('/close-friends')} />
        <Row icon="layers-outline" label="Story Highlights" onPress={() => router.push('/story-highlights')} />
        <Row icon="bar-chart-outline" label="Insights" onPress={() => router.push('/insights')} />

        <Text style={s.section}>More</Text>
        <Row icon="qr-code-outline" label="QR Code" onPress={() => router.push('/qr-profile')} />
        <Row icon="help-circle-outline" label="Help" />
        <Row icon="information-circle-outline" label="About" />

        <Text style={s.section}>{''}</Text>
        <Row icon="swap-horizontal-outline" label="Switch Account" />
        <Row icon="log-out-outline" label="Log Out" onPress={handleLogout} danger />

        <View style={s.footer}><Text style={s.footerText}>Moments v1.0.0</Text></View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  section: { fontSize: 13, fontWeight: '600', color: C.textMuted, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15, gap: 12 },
  rowLabel: { flex: 1, fontSize: 16, color: C.text },
  dangerText: { color: C.danger },
  footer: { padding: 40, alignItems: 'center' },
  footerText: { color: C.textDim, fontSize: 13 },
});
