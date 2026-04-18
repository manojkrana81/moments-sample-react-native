import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_USERS } from '../src/data/mockData';
import { C } from '../src/theme/colors';

export default function BlockedUsers() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [blocked, setBlocked] = useState(MOCK_USERS.slice(5, 7));

  const unblock = (id: string) => {
    Alert.alert('Unblock', 'Are you sure you want to unblock this user?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Unblock', onPress: () => setBlocked(prev => prev.filter(u => u.id !== id)) },
    ]);
  };

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Blocked Users</Text><View style={{ width: 24 }} /></View>
      <View style={s.info}><Ionicons name="ban-outline" size={20} color={C.textMuted} /><Text style={s.infoText}>Blocked users won't be able to see your profile, posts, or stories.</Text></View>
      <FlatList data={blocked} keyExtractor={i => i.id} showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={s.empty}><Ionicons name="checkmark-circle-outline" size={56} color={C.textDim} /><Text style={s.emptyTitle}>No blocked users</Text><Text style={s.emptySub}>You haven't blocked anyone yet</Text></View>}
        renderItem={({ item }) => (
          <View style={s.userItem}><Image source={{ uri: item.profile_picture }} style={s.avatar} /><View style={s.userInfo}><Text style={s.uname}>{item.username}</Text><Text style={s.fname}>{item.full_name}</Text></View>
            <TouchableOpacity style={s.unblockBtn} onPress={() => unblock(item.id)}><Text style={s.unblockText}>Unblock</Text></TouchableOpacity></View>
        )} />
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  info: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, margin: 16, backgroundColor: C.surface, borderRadius: 10, borderWidth: 1, borderColor: C.border },
  infoText: { flex: 1, fontSize: 13, color: C.textMuted, lineHeight: 18 },
  userItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  userInfo: { flex: 1 },
  uname: { fontSize: 15, fontWeight: '600', color: C.text },
  fname: { fontSize: 13, color: C.textMuted, marginTop: 2 },
  unblockBtn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: C.danger },
  unblockText: { color: C.danger, fontSize: 13, fontWeight: '600' },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: C.textMuted, marginTop: 12 },
  emptySub: { fontSize: 13, color: C.textDim, marginTop: 4 },
});
