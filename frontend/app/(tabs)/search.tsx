import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_USERS, MOCK_POSTS, MockUser, MockPost, formatCount } from '../../src/data/mockData';
import { C } from '../../src/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
const { width: W } = Dimensions.get('window');
const G = (W - 4) / 3;

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MockUser[]>([]);
  const [users, setUsers] = useState(MOCK_USERS);
  const handleSearch = (t: string) => { setQuery(t); setResults(t.length < 1 ? [] : users.filter(u => u.username.toLowerCase().includes(t.toLowerCase()) || u.full_name.toLowerCase().includes(t.toLowerCase()))); };
  const toggleFollow = (id: string) => { const up = (l: MockUser[]) => l.map(u => u.id === id ? { ...u, is_following: !u.is_following, followers_count: u.is_following ? u.followers_count - 1 : u.followers_count + 1 } : u); setUsers(up); setResults(up); };

  return (
    <View style={s.container}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <View style={s.searchBox}>
          <Ionicons name="search" size={18} color={C.textMuted} />
          <TextInput testID="search-input" style={s.searchInput} placeholder="Search..." value={query} onChangeText={handleSearch} autoCapitalize="none" placeholderTextColor={C.textMuted} />
          {query.length > 0 && <TouchableOpacity onPress={() => handleSearch('')}><Ionicons name="close-circle" size={18} color={C.textMuted} /></TouchableOpacity>}
        </View>
      </View>
      {query.length > 0 ? (
        <FlatList key="list" data={results} keyExtractor={i => i.id} ListEmptyComponent={<View style={s.empty}><Text style={s.emptyTxt}>No users found</Text></View>}
          renderItem={({ item }) => (
            <TouchableOpacity testID={`user-${item.id}`} style={s.userItem} onPress={() => router.push({ pathname: '/user-profile', params: { userId: item.id } })}>
              <Image source={{ uri: item.profile_picture }} style={s.avatar} />
              <View style={s.userInfo}><Text style={s.uname}>{item.username}</Text><Text style={s.fname}>{item.full_name}</Text></View>
              <TouchableOpacity style={[s.followBtn, item.is_following && s.followingBtn]} onPress={() => toggleFollow(item.id)}>
                <Text style={[s.followTxt, item.is_following && s.followingTxt]}>{item.is_following ? 'Following' : 'Follow'}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )} />
      ) : (
        <FlatList key="grid" data={MOCK_POSTS} keyExtractor={i => i.id} numColumns={3} columnWrapperStyle={s.gridRow} showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <TouchableOpacity style={s.gridItem}><Image source={{ uri: item.image }} style={s.gridImg} /></TouchableOpacity>} />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, borderRadius: 10, paddingHorizontal: 12, height: 40, borderWidth: 1, borderColor: C.border },
  searchInput: { flex: 1, fontSize: 15, color: C.text, marginLeft: 8 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyTxt: { color: C.textMuted, fontSize: 16 },
  userItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: C.goldBorder },
  userInfo: { flex: 1 },
  uname: { fontSize: 15, fontWeight: '600', color: C.text },
  fname: { fontSize: 13, color: C.textMuted, marginTop: 2 },
  followBtn: { backgroundColor: C.gold, paddingHorizontal: 18, paddingVertical: 7, borderRadius: 8 },
  followingBtn: { backgroundColor: C.surface, borderWidth: 1, borderColor: C.goldBorder },
  followTxt: { color: C.bg, fontSize: 13, fontWeight: '600' },
  followingTxt: { color: C.gold },
  gridRow: { gap: 2, marginBottom: 2 },
  gridItem: { width: G, height: G },
  gridImg: { width: '100%', height: '100%', backgroundColor: C.surface },
});
