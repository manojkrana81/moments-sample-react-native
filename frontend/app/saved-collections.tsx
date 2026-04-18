import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../src/theme/colors';
import { MOCK_POSTS } from '../src/data/mockData';
const { width: W } = Dimensions.get('window');
const G = (W - 16) / 2;

const collections = [
  { id: '1', name: 'Travel', count: 12, cover: MOCK_POSTS[0]?.image },
  { id: '2', name: 'Food', count: 8, cover: MOCK_POSTS[1]?.image },
  { id: '3', name: 'Nature', count: 15, cover: MOCK_POSTS[2]?.image },
  { id: '4', name: 'Design', count: 5, cover: MOCK_POSTS[9]?.image },
];

export default function SavedCollections() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Saved</Text><TouchableOpacity><Ionicons name="add-outline" size={26} color={C.gold} /></TouchableOpacity></View>
      <FlatList data={collections} keyExtractor={i => i.id} numColumns={2} columnWrapperStyle={s.row} contentContainerStyle={s.list}
        ListHeaderComponent={<TouchableOpacity style={s.allSaved}><Ionicons name="bookmark" size={24} color={C.gold} /><View style={s.allInfo}><Text style={s.allTitle}>All Saved</Text><Text style={s.allCount}>40 items</Text></View><Ionicons name="chevron-forward" size={20} color={C.textDim} /></TouchableOpacity>}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.card}><Image source={{ uri: item.cover }} style={s.cardImg} /><View style={s.cardOverlay}><Text style={s.cardName}>{item.name}</Text><Text style={s.cardCount}>{item.count} items</Text></View></TouchableOpacity>
        )} />
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  list: { padding: 8 },
  allSaved: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, margin: 8, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: C.goldBorder, gap: 12 },
  allInfo: { flex: 1 },
  allTitle: { fontSize: 16, fontWeight: '600', color: C.text },
  allCount: { fontSize: 13, color: C.textMuted, marginTop: 2 },
  row: { gap: 8, marginBottom: 8, paddingHorizontal: 8 },
  card: { width: G, height: G, borderRadius: 12, overflow: 'hidden', position: 'relative' },
  cardImg: { width: '100%', height: '100%', backgroundColor: C.surface },
  cardOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, backgroundColor: 'rgba(10,22,40,0.7)' },
  cardName: { color: C.text, fontWeight: '600', fontSize: 14 },
  cardCount: { color: C.textMuted, fontSize: 12, marginTop: 2 },
});
