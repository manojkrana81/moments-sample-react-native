import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../src/contexts/AuthContext';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text>{children}</View>
);

const Row = ({ icon, label, value, onPress, danger }: { icon: string; label: string; value?: string; onPress?: () => void; danger?: boolean }) => (
  <TouchableOpacity testID={`settings-${label.toLowerCase().replace(/\s/g, '-')}`} style={styles.row} onPress={onPress}>
    <Ionicons name={icon as any} size={22} color={danger ? '#FF4757' : '#FFFFFF'} />
    <Text style={[styles.rowLabel, danger && styles.dangerText]}>{label}</Text>
    {value && <Text style={styles.rowValue}>{value}</Text>}
    <Ionicons name="chevron-forward" size={18} color="#3D5278" />
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: async () => { await logout(); router.replace('/(auth)/login'); } },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity testID="back-settings-btn" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Section title="Account">
          <Row icon="person-outline" label="Personal Information" />
          <Row icon="shield-outline" label="Security" />
          <Row icon="notifications-outline" label="Notifications" />
          <Row icon="lock-closed-outline" label="Privacy" />
        </Section>
        <Section title="Content">
          <Row icon="bookmark-outline" label="Saved" />
          <Row icon="archive-outline" label="Archive" />
          <Row icon="time-outline" label="Your Activity" />
        </Section>
        <Section title="Support">
          <Row icon="help-circle-outline" label="Help" />
          <Row icon="information-circle-outline" label="About" />
        </Section>
        <Section title="">
          <Row icon="swap-horizontal-outline" label="Switch Account" />
          <Row icon="log-out-outline" label="Log Out" onPress={handleLogout} danger />
        </Section>
        <View style={styles.footer}><Text style={styles.footerText}>Moments v1.0.0</Text></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1628' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  section: { paddingTop: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#3D5278', paddingHorizontal: 16, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  rowLabel: { flex: 1, fontSize: 16, color: '#FFFFFF' },
  rowValue: { fontSize: 14, color: '#3D5278', marginRight: 4 },
  dangerText: { color: '#FF4757' },
  footer: { padding: 40, alignItems: 'center' },
  footerText: { color: '#3D5278', fontSize: 13 },
});
