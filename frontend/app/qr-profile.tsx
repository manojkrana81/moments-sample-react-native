import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../src/contexts/AuthContext';
import { C } from '../src/theme/colors';

export default function QRProfile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>QR Code</Text><TouchableOpacity><Ionicons name="share-outline" size={24} color={C.gold} /></TouchableOpacity></View>
      <View style={s.content}>
        <View style={s.qrCard}>
          <Text style={s.cardLogo}>Moments</Text>
          <View style={s.qrPlaceholder}>
            <Ionicons name="qr-code" size={120} color={C.gold} />
          </View>
          <Text style={s.username}>@{user?.username || 'user'}</Text>
          <Text style={s.sub}>Scan to follow on Moments</Text>
        </View>
        <View style={s.actions}>
          <TouchableOpacity style={s.actionBtn}><Ionicons name="share-social-outline" size={22} color={C.gold} /><Text style={s.actionTxt}>Share</Text></TouchableOpacity>
          <TouchableOpacity style={s.actionBtn}><Ionicons name="download-outline" size={22} color={C.gold} /><Text style={s.actionTxt}>Save</Text></TouchableOpacity>
          <TouchableOpacity style={s.actionBtn}><Ionicons name="copy-outline" size={22} color={C.gold} /><Text style={s.actionTxt}>Copy Link</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  qrCard: { backgroundColor: C.surface, borderRadius: 24, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: C.goldBorder, width: '100%', maxWidth: 320 },
  cardLogo: { fontSize: 28, fontWeight: '700', color: C.gold, fontStyle: 'italic', marginBottom: 24 },
  qrPlaceholder: { width: 180, height: 180, justifyContent: 'center', alignItems: 'center', backgroundColor: C.bg, borderRadius: 16, marginBottom: 24, borderWidth: 1, borderColor: C.goldBorder },
  username: { fontSize: 18, fontWeight: '600', color: C.text, marginBottom: 4 },
  sub: { fontSize: 13, color: C.textMuted },
  actions: { flexDirection: 'row', marginTop: 32, gap: 16 },
  actionBtn: { alignItems: 'center', gap: 6, backgroundColor: C.surface, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: C.goldBorder },
  actionTxt: { fontSize: 12, color: C.gold, fontWeight: '600' },
});
