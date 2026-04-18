import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_STORIES } from '../src/data/mockData';
import { C } from '../src/theme/colors';

const highlights = [
  { id: '1', name: 'Travel', cover: MOCK_STORIES[0]?.image, count: 12 },
  { id: '2', name: 'Food', cover: MOCK_STORIES[2]?.image, count: 8 },
  { id: '3', name: 'Music', cover: MOCK_STORIES[3]?.image, count: 5 },
  { id: '4', name: 'Fitness', cover: MOCK_STORIES[4]?.image, count: 15 },
];

export default function StoryHighlights() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Story Highlights</Text><TouchableOpacity><Ionicons name="add-outline" size={26} color={C.gold} /></TouchableOpacity></View>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.infoBox}><Ionicons name="layers-outline" size={22} color={C.gold} /><Text style={s.infoText}>Keep your favorite stories on your profile permanently</Text></View>
        {highlights.map(h => (
          <TouchableOpacity key={h.id} style={s.highlightItem}>
            <Image source={{ uri: h.cover }} style={s.cover} />
            <View style={s.hInfo}><Text style={s.hName}>{h.name}</Text><Text style={s.hCount}>{h.count} stories</Text></View>
            <TouchableOpacity><Ionicons name="ellipsis-vertical" size={20} color={C.textDim} /></TouchableOpacity>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={s.addNew}><Ionicons name="add-circle-outline" size={24} color={C.gold} /><Text style={s.addTxt}>Create New Highlight</Text></TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  content: { padding: 16 },
  infoBox: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, backgroundColor: C.goldGlow, borderRadius: 12, borderWidth: 1, borderColor: C.goldBorder, marginBottom: 20 },
  infoText: { flex: 1, fontSize: 13, color: C.textSoft, lineHeight: 18 },
  highlightItem: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16, backgroundColor: C.surface, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: C.border },
  cover: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: C.goldBorder },
  hInfo: { flex: 1 },
  hName: { fontSize: 16, fontWeight: '600', color: C.text },
  hCount: { fontSize: 13, color: C.textMuted, marginTop: 2 },
  addNew: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderWidth: 1, borderColor: C.goldBorder, borderRadius: 12, borderStyle: 'dashed', marginTop: 8 },
  addTxt: { color: C.gold, fontSize: 15, fontWeight: '600' },
});
