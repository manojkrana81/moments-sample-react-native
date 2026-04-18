import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../src/theme/colors';

const activities = [
  { id: '1', icon: 'heart', text: 'You liked a post by emma.travels', time: '2 hours ago' },
  { id: '2', icon: 'chatbubble', text: 'You commented on sophia.creates post', time: '4 hours ago' },
  { id: '3', icon: 'person-add', text: 'You started following james.captures', time: '6 hours ago' },
  { id: '4', icon: 'bookmark', text: 'You saved a post by olivia.eats', time: '1 day ago' },
  { id: '5', icon: 'share', text: 'You shared a reel by ava.fitness', time: '1 day ago' },
  { id: '6', icon: 'heart', text: 'You liked 5 posts', time: '2 days ago' },
  { id: '7', icon: 'search', text: 'You searched for "travel photography"', time: '3 days ago' },
  { id: '8', icon: 'time', text: 'You spent 45 mins on Moments', time: '3 days ago' },
];

export default function ActivityLog() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Your Activity</Text><View style={{ width: 24 }} /></View>
      <FlatList data={activities} keyExtractor={i => i.id} showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={s.item}><View style={s.iconWrap}><Ionicons name={item.icon as any} size={18} color={C.gold} /></View><View style={s.info}><Text style={s.text}>{item.text}</Text><Text style={s.time}>{item.time}</Text></View></View>
        )} />
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  item: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  iconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.goldGlow, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: C.goldBorder },
  info: { flex: 1 },
  text: { fontSize: 14, color: C.textSoft, lineHeight: 18 },
  time: { fontSize: 12, color: C.textDim, marginTop: 4 },
});
