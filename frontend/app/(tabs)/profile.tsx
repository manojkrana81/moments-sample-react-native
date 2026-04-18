import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_POSTS, formatCount } from '../../src/data/mockData';
import { C } from '../../src/theme/colors';
const { width: W } = Dimensions.get('window');
const G = (W - 4) / 3;

export default function ProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<'grid' | 'saved'>('grid');
  const userPosts = MOCK_POSTS.slice(0, 6);
  if (!user) return null;

  return (
    <View style={s.container}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.headerTitle}>{user.username}</Text>
        <View style={s.headerR}>
          <TouchableOpacity testID="add-btn" onPress={() => router.push('/add-post')}><Ionicons name="add-circle-outline" size={26} color={C.gold} /></TouchableOpacity>
          <TouchableOpacity testID="settings-btn" onPress={() => router.push('/settings')}><Ionicons name="menu-outline" size={26} color={C.text} /></TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.profileTop}>
          <View style={s.avatarWrap}>
            {user.profile_picture ? <Image source={{ uri: user.profile_picture }} style={s.profileImg} /> :
              <View style={[s.profileImg, s.placeholder]}><Text style={s.initial}>{user.full_name.charAt(0).toUpperCase()}</Text></View>}
          </View>
          <View style={s.statsRow}>
            <View style={s.stat}><Text style={s.statVal}>{userPosts.length}</Text><Text style={s.statLbl}>Posts</Text></View>
            <TouchableOpacity style={s.stat} onPress={() => router.push({ pathname: '/followers', params: { tab: 'followers' } })}><Text style={s.statVal}>{formatCount(user.followers_count)}</Text><Text style={s.statLbl}>Followers</Text></TouchableOpacity>
            <TouchableOpacity style={s.stat} onPress={() => router.push({ pathname: '/followers', params: { tab: 'following' } })}><Text style={s.statVal}>{formatCount(user.following_count)}</Text><Text style={s.statLbl}>Following</Text></TouchableOpacity>
          </View>
        </View>
        <View style={s.bio}><Text style={s.fullName}>{user.full_name}</Text>{user.bio ? <Text style={s.bioTxt}>{user.bio}</Text> : null}</View>
        <View style={s.btnRow}>
          <TouchableOpacity testID="edit-profile-btn" style={s.editBtn} onPress={() => router.push('/edit-profile')}><Text style={s.editTxt}>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={s.editBtn} onPress={() => router.push('/insights')}><Text style={s.editTxt}>Insights</Text></TouchableOpacity>
          <TouchableOpacity style={s.smallBtn} onPress={() => router.push('/qr-profile')}><Ionicons name="qr-code-outline" size={18} color={C.gold} /></TouchableOpacity>
        </View>
        {/* Story Highlights */}
        <TouchableOpacity style={s.highlightsRow} onPress={() => router.push('/story-highlights')}>
          <View style={s.highlightCircle}><Ionicons name="add" size={28} color={C.gold} /></View>
          <Text style={s.highlightLabel}>Highlights</Text>
        </TouchableOpacity>
        {/* Quick links row */}
        <View style={s.quickRow}>
          <TouchableOpacity style={s.quickItem} onPress={() => router.push('/saved-collections')}><Ionicons name="bookmark-outline" size={20} color={C.gold} /><Text style={s.quickTxt}>Saved</Text></TouchableOpacity>
          <TouchableOpacity style={s.quickItem} onPress={() => router.push('/archive')}><Ionicons name="archive-outline" size={20} color={C.gold} /><Text style={s.quickTxt}>Archive</Text></TouchableOpacity>
          <TouchableOpacity style={s.quickItem} onPress={() => router.push('/close-friends')}><Ionicons name="star-outline" size={20} color={C.gold} /><Text style={s.quickTxt}>Close Friends</Text></TouchableOpacity>
          <TouchableOpacity style={s.quickItem} onPress={() => router.push('/activity-log')}><Ionicons name="time-outline" size={20} color={C.gold} /><Text style={s.quickTxt}>Activity</Text></TouchableOpacity>
        </View>
        <View style={s.tabBar}>
          <TouchableOpacity style={[s.tab, tab === 'grid' && s.activeTab]} onPress={() => setTab('grid')}><Ionicons name="grid" size={20} color={tab === 'grid' ? C.gold : C.textDim} /></TouchableOpacity>
          <TouchableOpacity style={[s.tab, tab === 'saved' && s.activeTab]} onPress={() => setTab('saved')}><Ionicons name="bookmark" size={20} color={tab === 'saved' ? C.gold : C.textDim} /></TouchableOpacity>
        </View>
        {tab === 'grid' ? (
          <FlatList data={userPosts} keyExtractor={i => i.id} numColumns={3} scrollEnabled={false} columnWrapperStyle={s.gridRow}
            renderItem={({ item }) => <TouchableOpacity style={s.gridItem}><Image source={{ uri: item.image }} style={s.gridImg} /></TouchableOpacity>}
            ListEmptyComponent={<View style={s.empty}><Text style={s.emptyTxt}>No posts yet</Text></View>} />
        ) : <View style={s.empty}><Ionicons name="bookmark-outline" size={48} color={C.textDim} /><Text style={s.emptyTxt}>No saved posts</Text></View>}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: C.goldBorder },
  headerTitle: { fontSize: 22, fontWeight: '700', color: C.text },
  headerR: { flexDirection: 'row', gap: 16 },
  profileTop: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  avatarWrap: { marginRight: 24 },
  profileImg: { width: 82, height: 82, borderRadius: 41, borderWidth: 2, borderColor: C.goldBorder },
  placeholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: C.gold },
  initial: { fontSize: 34, fontWeight: '700', color: C.bg },
  statsRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '700', color: C.text },
  statLbl: { fontSize: 12, color: C.textMuted, marginTop: 2 },
  bio: { paddingHorizontal: 16, marginBottom: 12 },
  fullName: { fontSize: 15, fontWeight: '600', color: C.text, marginBottom: 4 },
  bioTxt: { fontSize: 14, color: C.textSoft, lineHeight: 20 },
  btnRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 12, gap: 8 },
  editBtn: { flex: 1, paddingVertical: 8, backgroundColor: C.surface, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: C.goldBorder },
  editTxt: { fontSize: 13, fontWeight: '600', color: C.gold },
  smallBtn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: C.surface, borderRadius: 8, borderWidth: 1, borderColor: C.goldBorder },
  highlightsRow: { paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  highlightCircle: { width: 56, height: 56, borderRadius: 28, borderWidth: 1.5, borderColor: C.goldBorder, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  highlightLabel: { fontSize: 13, color: C.textMuted },
  quickRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 12, gap: 8 },
  quickItem: { flex: 1, backgroundColor: C.surface, borderRadius: 8, paddingVertical: 10, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: C.border },
  quickTxt: { fontSize: 11, color: C.textMuted },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.border, borderBottomWidth: 1, borderBottomColor: C.border },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: C.gold },
  gridRow: { gap: 2, marginBottom: 2 },
  gridItem: { width: G, height: G },
  gridImg: { width: '100%', height: '100%', backgroundColor: C.surface },
  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyTxt: { fontSize: 14, color: C.textDim, marginTop: 8 },
});
