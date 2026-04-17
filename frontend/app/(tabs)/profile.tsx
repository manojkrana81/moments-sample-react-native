import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_POSTS, MockPost, formatCount } from '../../src/data/mockData';

const { width: W } = Dimensions.get('window');
const GRID = (W - 4) / 3;

export default function ProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'grid' | 'saved'>('grid');
  const userPosts = MOCK_POSTS.slice(0, 6);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>{user.username}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity testID="add-post-btn" onPress={() => router.push('/add-post')}><Ionicons name="add-circle-outline" size={28} color="#2C3E50" /></TouchableOpacity>
          <TouchableOpacity testID="settings-btn" onPress={() => router.push('/settings')}><Ionicons name="menu-outline" size={28} color="#2C3E50" /></TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileTop}>
          <View style={styles.avatarWrap}>
            {user.profile_picture ? <Image source={{ uri: user.profile_picture }} style={styles.profileImg} /> :
              <View style={[styles.profileImg, styles.profilePlaceholder]}><Text style={styles.initial}>{user.full_name.charAt(0).toUpperCase()}</Text></View>}
          </View>
          <View style={styles.statsRow}>
            <View style={styles.stat}><Text style={styles.statVal}>{userPosts.length}</Text><Text style={styles.statLbl}>Posts</Text></View>
            <TouchableOpacity style={styles.stat} onPress={() => router.push({ pathname: '/followers', params: { tab: 'followers' } })}>
              <Text style={styles.statVal}>{formatCount(user.followers_count)}</Text><Text style={styles.statLbl}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stat} onPress={() => router.push({ pathname: '/followers', params: { tab: 'following' } })}>
              <Text style={styles.statVal}>{formatCount(user.following_count)}</Text><Text style={styles.statLbl}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bioSection}>
          <Text style={styles.fullName}>{user.full_name}</Text>
          {user.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity testID="edit-profile-btn" style={styles.editBtn} onPress={() => router.push('/edit-profile')}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editBtn}><Text style={styles.editText}>Share Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.smallBtn} onPress={() => router.push('/notifications')}>
            <Ionicons name="heart-outline" size={18} color="#2C3E50" />
          </TouchableOpacity>
        </View>
        <View style={styles.tabBar}>
          <TouchableOpacity style={[styles.tab, selectedTab === 'grid' && styles.activeTab]} onPress={() => setSelectedTab('grid')}>
            <Ionicons name="grid" size={22} color={selectedTab === 'grid' ? '#2C3E50' : '#95A5A6'} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, selectedTab === 'saved' && styles.activeTab]} onPress={() => setSelectedTab('saved')}>
            <Ionicons name="bookmark" size={22} color={selectedTab === 'saved' ? '#2C3E50' : '#95A5A6'} />
          </TouchableOpacity>
        </View>
        {selectedTab === 'grid' ? (
          <FlatList data={userPosts} keyExtractor={item => item.id} numColumns={3} scrollEnabled={false} columnWrapperStyle={styles.gridRow}
            renderItem={({ item }) => <TouchableOpacity style={styles.gridItem}><Image source={{ uri: item.image }} style={styles.gridImg} /></TouchableOpacity>}
            ListEmptyComponent={<View style={styles.empty}><Ionicons name="camera-outline" size={56} color="#D0D0D0" /><Text style={styles.emptyTitle}>No posts yet</Text></View>}
          />
        ) : (
          <View style={styles.empty}><Ionicons name="bookmark-outline" size={56} color="#D0D0D0" /><Text style={styles.emptyTitle}>No saved posts</Text></View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#2C3E50' },
  headerRight: { flexDirection: 'row', gap: 16 },
  profileTop: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  avatarWrap: { marginRight: 24 },
  profileImg: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#F0F0F0' },
  profilePlaceholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#4A90E2' },
  initial: { fontSize: 36, fontWeight: '700', color: '#FFF' },
  statsRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '700', color: '#2C3E50' },
  statLbl: { fontSize: 13, color: '#7F8C8D', marginTop: 2 },
  bioSection: { paddingHorizontal: 16, marginBottom: 16 },
  fullName: { fontSize: 15, fontWeight: '600', color: '#2C3E50', marginBottom: 4 },
  bio: { fontSize: 14, color: '#555', lineHeight: 20 },
  btnRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, gap: 8 },
  editBtn: { flex: 1, paddingVertical: 8, backgroundColor: '#F5F6F7', borderRadius: 8, alignItems: 'center' },
  editText: { fontSize: 14, fontWeight: '600', color: '#2C3E50' },
  smallBtn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#F5F6F7', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F0F0F0', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#2C3E50' },
  gridRow: { gap: 2, marginBottom: 2 },
  gridItem: { width: GRID, height: GRID },
  gridImg: { width: '100%', height: '100%', backgroundColor: '#F5F5F5' },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: '#7F8C8D', marginTop: 12 },
});
