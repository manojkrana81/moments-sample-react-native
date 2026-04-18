import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../src/theme/colors';

const Toggle = ({ label, sub, value, onToggle }: { label: string; sub: string; value: boolean; onToggle: () => void }) => (
  <View style={s.toggleRow}><View style={s.toggleInfo}><Text style={s.toggleLabel}>{label}</Text><Text style={s.toggleSub}>{sub}</Text></View><Switch value={value} onValueChange={onToggle} trackColor={{ false: C.border, true: C.navy }} thumbColor="#FFF" /></View>
);

export default function PrivacySettings() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [privateAcc, setPrivateAcc] = useState(false);
  const [activityStatus, setActivityStatus] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [storyShare, setStoryShare] = useState(true);
  const [tagApproval, setTagApproval] = useState(false);

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Privacy</Text><View style={{ width: 24 }} /></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={s.section}>Account Privacy</Text>
        <Toggle label="Private Account" sub="Only approved followers can see your posts" value={privateAcc} onToggle={() => setPrivateAcc(!privateAcc)} />
        <Text style={s.section}>Interactions</Text>
        <Toggle label="Activity Status" sub="Allow others to see when you're active" value={activityStatus} onToggle={() => setActivityStatus(!activityStatus)} />
        <Toggle label="Read Receipts" sub="Show when you've seen messages" value={readReceipts} onToggle={() => setReadReceipts(!readReceipts)} />
        <Toggle label="Story Sharing" sub="Allow others to share your stories" value={storyShare} onToggle={() => setStoryShare(!storyShare)} />
        <Toggle label="Tag Approval" sub="Manually approve tags before they appear" value={tagApproval} onToggle={() => setTagApproval(!tagApproval)} />
        <Text style={s.section}>Connections</Text>
        <TouchableOpacity style={s.navRow} onPress={() => router.push('/blocked-users')}><Ionicons name="ban-outline" size={22} color={C.text} /><Text style={s.navLabel}>Blocked Users</Text><Ionicons name="chevron-forward" size={18} color={C.textDim} /></TouchableOpacity>
        <TouchableOpacity style={s.navRow} onPress={() => router.push('/close-friends')}><Ionicons name="star-outline" size={22} color={C.text} /><Text style={s.navLabel}>Close Friends</Text><Ionicons name="chevron-forward" size={18} color={C.textDim} /></TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  section: { fontSize: 13, fontWeight: '600', color: C.textMuted, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  toggleInfo: { flex: 1 },
  toggleLabel: { fontSize: 16, color: C.text },
  toggleSub: { fontSize: 13, color: C.textMuted, marginTop: 2 },
  navRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  navLabel: { flex: 1, fontSize: 16, color: C.text },
});
