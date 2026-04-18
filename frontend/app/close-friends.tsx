import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_USERS, MockUser } from '../src/data/mockData';
import { C } from '../src/theme/colors';

export default function CloseFriends() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [closeFriends, setCloseFriends] = useState<string[]>(['u1', 'u3', 'u5']);
  const toggle = (id: string) => setCloseFriends(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Close Friends</Text><View style={{ width: 24 }} /></View>
      <View style={s.info}><Ionicons name="star" size={24} color={C.gold} /><Text style={s.infoText}>Share stories and posts exclusively with your close friends</Text></View>
      <FlatList data={MOCK_USERS} keyExtractor={i => i.id} showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isClose = closeFriends.includes(item.id);
          return (
            <View style={s.userItem}>
              <Image source={{ uri: item.profile_picture }} style={s.avatar} />
              <View style={s.userInfo}><Text style={s.uname}>{item.username}</Text><Text style={s.fname}>{item.full_name}</Text></View>
              <TouchableOpacity style={[s.btn, isClose && s.btnActive]} onPress={() => toggle(item.id)}>
                {isClose ? <Ionicons name="star" size={16} color={C.bg} /> : <Ionicons name="star-outline" size={16} color={C.gold} />}
                <Text style={[s.btnTxt, isClose && s.btnTxtActive]}>{isClose ? 'Close' : 'Add'}</Text>
              </TouchableOpacity>
            </View>
          );
        }} />
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  info: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, backgroundColor: C.goldGlow, margin: 16, borderRadius: 12, borderWidth: 1, borderColor: C.goldBorder },
  infoText: { flex: 1, fontSize: 13, color: C.textSoft, lineHeight: 18 },
  userItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: C.goldBorder },
  userInfo: { flex: 1 },
  uname: { fontSize: 15, fontWeight: '600', color: C.text },
  fname: { fontSize: 13, color: C.textMuted, marginTop: 2 },
  btn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: C.goldBorder, backgroundColor: C.surface },
  btnActive: { backgroundColor: C.gold, borderColor: C.gold },
  btnTxt: { fontSize: 13, fontWeight: '600', color: C.gold },
  btnTxtActive: { color: C.bg },
});
