import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../src/theme/colors';

const StatCard = ({ label, value, change, icon }: { label: string; value: string; change: string; icon: string }) => (
  <View style={s.statCard}><View style={s.statTop}><Ionicons name={icon as any} size={20} color={C.gold} /><Text style={s.change}>{change}</Text></View><Text style={s.statValue}>{value}</Text><Text style={s.statLabel}>{label}</Text></View>
);

export default function Insights() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Insights</Text><View style={{ width: 24 }} /></View>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.period}>Last 30 days</Text>
        <View style={s.statsGrid}>
          <StatCard label="Reach" value="12.4k" change="+24%" icon="eye-outline" />
          <StatCard label="Impressions" value="45.2k" change="+18%" icon="layers-outline" />
          <StatCard label="Profile Visits" value="1.2k" change="+32%" icon="person-outline" />
          <StatCard label="Engagement" value="8.7%" change="+5%" icon="heart-outline" />
        </View>
        <View style={s.section}><Text style={s.sectionTitle}>Audience</Text>
          <View style={s.audienceItem}><Text style={s.audLabel}>Top Location</Text><Text style={s.audValue}>New York, US</Text></View>
          <View style={s.audienceItem}><Text style={s.audLabel}>Age Range</Text><Text style={s.audValue}>25-34 (42%)</Text></View>
          <View style={s.audienceItem}><Text style={s.audLabel}>Gender</Text><Text style={s.audValue}>Female (58%)</Text></View>
          <View style={s.audienceItem}><Text style={s.audLabel}>Most Active</Text><Text style={s.audValue}>Tue, Thu at 8 PM</Text></View>
        </View>
        <View style={s.section}><Text style={s.sectionTitle}>Top Posts</Text>
          <View style={s.topPost}><View style={s.topPostBar} /><View><Text style={s.topPostLabel}>Everest Base Camp</Text><Text style={s.topPostStat}>1,243 likes · 89 comments</Text></View></View>
          <View style={s.topPost}><View style={[s.topPostBar, { width: '72%' }]} /><View><Text style={s.topPostLabel}>Golden Hour Magic</Text><Text style={s.topPostStat}>2,341 likes · 134 comments</Text></View></View>
        </View>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  content: { padding: 16 },
  period: { fontSize: 13, color: C.textMuted, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  statCard: { width: '48%', backgroundColor: C.surface, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: C.goldBorder },
  statTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  change: { color: C.success, fontSize: 13, fontWeight: '600' },
  statValue: { fontSize: 24, fontWeight: '700', color: C.text },
  statLabel: { fontSize: 13, color: C.textMuted, marginTop: 4 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: C.gold, marginBottom: 12 },
  audienceItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  audLabel: { fontSize: 14, color: C.textMuted },
  audValue: { fontSize: 14, fontWeight: '600', color: C.text },
  topPost: { marginBottom: 16 },
  topPostBar: { height: 6, backgroundColor: C.gold, borderRadius: 3, marginBottom: 8, width: '85%' },
  topPostLabel: { fontSize: 14, fontWeight: '600', color: C.text },
  topPostStat: { fontSize: 12, color: C.textMuted, marginTop: 2 },
});
