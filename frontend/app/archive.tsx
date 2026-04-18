import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_POSTS } from '../src/data/mockData';
import { C } from '../src/theme/colors';
const { width: W } = Dimensions.get('window');
const G = (W - 4) / 3;

export default function Archive() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Archive</Text><View style={{ width: 24 }} /></View>
      <View style={s.tabs}><TouchableOpacity style={[s.tab, s.activeTab]}><Text style={s.tabTxtActive}>Posts</Text></TouchableOpacity><TouchableOpacity style={s.tab}><Text style={s.tabTxt}>Stories</Text></TouchableOpacity><TouchableOpacity style={s.tab}><Text style={s.tabTxt}>Reels</Text></TouchableOpacity></View>
      <FlatList data={MOCK_POSTS.slice(4, 10)} keyExtractor={i => i.id} numColumns={3} columnWrapperStyle={s.gridRow} showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={s.empty}><Ionicons name="archive-outline" size={48} color={C.textDim} /><Text style={s.emptyTxt}>No archived posts</Text></View>}
        renderItem={({ item }) => <TouchableOpacity style={s.gridItem}><Image source={{ uri: item.image }} style={s.gridImg} /></TouchableOpacity>} />
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.border },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: C.gold },
  tabTxt: { fontSize: 14, color: C.textDim, fontWeight: '500' },
  tabTxtActive: { fontSize: 14, color: C.gold, fontWeight: '600' },
  gridRow: { gap: 2, marginBottom: 2 },
  gridItem: { width: G, height: G },
  gridImg: { width: '100%', height: '100%', backgroundColor: C.surface },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyTxt: { color: C.textDim, fontSize: 14, marginTop: 8 },
});
