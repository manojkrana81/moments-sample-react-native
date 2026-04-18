import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../src/theme/colors';

const stats = [
  { label: 'Time Spent Today', value: '1h 23m', icon: 'time-outline', sub: '15% less than yesterday' },
  { label: 'Posts Liked', value: '47', icon: 'heart-outline', sub: 'This week' },
  { label: 'Comments Made', value: '12', icon: 'chatbubble-outline', sub: 'This week' },
  { label: 'Stories Viewed', value: '89', icon: 'eye-outline', sub: 'This week' },
  { label: 'Posts Shared', value: '5', icon: 'share-outline', sub: 'This week' },
];

const dailyAvg = [
  { day: 'Mon', mins: 45 }, { day: 'Tue', mins: 62 }, { day: 'Wed', mins: 38 },
  { day: 'Thu', mins: 55 }, { day: 'Fri', mins: 70 }, { day: 'Sat', mins: 90 }, { day: 'Sun', mins: 83 },
];

export default function UserActivity() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const maxMins = Math.max(...dailyAvg.map(d => d.mins));

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Your Activity</Text><View style={{ width: 24 }} /></View>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.timeCard}><Ionicons name="hourglass-outline" size={28} color={C.navy} /><View style={s.timeInfo}><Text style={s.timeValue}>1h 23m</Text><Text style={s.timeSub}>Average daily time on Moments</Text></View></View>
        <Text style={s.sectionTitle}>Weekly Screen Time</Text>
        <View style={s.chartRow}>
          {dailyAvg.map((d, i) => (
            <View key={i} style={s.barCol}><View style={[s.bar, { height: (d.mins / maxMins) * 80 }]} /><Text style={s.barLabel}>{d.day}</Text></View>
          ))}
        </View>
        <Text style={s.sectionTitle}>This Week</Text>
        {stats.map((st, i) => (
          <View key={i} style={s.statItem}><View style={s.statIcon}><Ionicons name={st.icon as any} size={20} color={C.navy} /></View><View style={s.statInfo}><Text style={s.statLabel}>{st.label}</Text><Text style={s.statSub}>{st.sub}</Text></View><Text style={s.statValue}>{st.value}</Text></View>
        ))}
        <TouchableOpacity style={s.reminderBtn}><Ionicons name="alarm-outline" size={20} color={C.navy} /><Text style={s.reminderText}>Set Daily Reminder</Text></TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  content: { padding: 16, paddingBottom: 40 },
  timeCard: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18, backgroundColor: C.surface, borderRadius: 14, marginBottom: 24, borderWidth: 1, borderColor: C.border },
  timeInfo: { flex: 1 },
  timeValue: { fontSize: 28, fontWeight: '700', color: C.navy },
  timeSub: { fontSize: 13, color: C.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: C.navy, marginBottom: 12, marginTop: 8 },
  chartRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 110, marginBottom: 24, paddingHorizontal: 8 },
  barCol: { alignItems: 'center', flex: 1 },
  bar: { width: 24, backgroundColor: C.navy, borderRadius: 4, minHeight: 8 },
  barLabel: { fontSize: 11, color: C.textDim, marginTop: 6 },
  statItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.borderLight, gap: 12 },
  statIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.surface, justifyContent: 'center', alignItems: 'center' },
  statInfo: { flex: 1 },
  statLabel: { fontSize: 15, color: C.text },
  statSub: { fontSize: 12, color: C.textDim, marginTop: 2 },
  statValue: { fontSize: 18, fontWeight: '700', color: C.navy },
  reminderBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, marginTop: 20, borderWidth: 1.5, borderColor: C.navy, borderRadius: 12 },
  reminderText: { fontSize: 15, fontWeight: '600', color: C.navy },
});
