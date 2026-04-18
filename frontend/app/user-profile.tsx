import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_USERS, MOCK_POSTS, formatCount } from '../src/data/mockData';

const { width: W } = Dimensions.get('window');
const GRID = (W - 4) / 3;

export default function UserProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const user = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
  const [isFollowing, setIsFollowing] = useState(user.is_following);
  const userPosts = MOCK_POSTS.filter(p => p.user_id === user.id);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity testID="back-profile-btn" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{user.username}</Text>
        <TouchableOpacity><Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" /></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileTop}>
          <Image source={{ uri: user.profile_picture }} style={styles.avatar} />
          <View style={styles.statsRow}>
            <View style={styles.stat}><Text style={styles.statVal}>{user.posts_count}</Text><Text style={styles.statLbl}>Posts</Text></View>
            <TouchableOpacity style={styles.stat} onPress={() => router.push({ pathname: '/followers', params: { userId: user.id, tab: 'followers' } })}>
              <Text style={styles.statVal}>{formatCount(user.followers_count)}</Text><Text style={styles.statLbl}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stat} onPress={() => router.push({ pathname: '/followers', params: { userId: user.id, tab: 'following' } })}>
              <Text style={styles.statVal}>{formatCount(user.following_count)}</Text><Text style={styles.statLbl}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bio}><Text style={styles.fullName}>{user.full_name}</Text><Text style={styles.bioText}>{user.bio}</Text></View>
        <View style={styles.actions}>
          <TouchableOpacity testID="follow-action-btn" style={[styles.actionBtn, isFollowing && styles.followingBtn]} onPress={() => setIsFollowing(!isFollowing)}>
            <Text style={[styles.actionText, isFollowing && styles.followingText]}>{isFollowing ? 'Following' : 'Follow'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnSecondary} onPress={() => router.push({ pathname: '/chat', params: { userId: user.id } })}>
            <Text style={styles.actionTextSecondary}>Message</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabBar}><View style={styles.activeTab}><Ionicons name="grid" size={22} color="#FFFFFF" /></View></View>
        <FlatList data={userPosts} keyExtractor={item => item.id} numColumns={3} scrollEnabled={false} columnWrapperStyle={styles.gridRow}
          renderItem={({ item }) => <TouchableOpacity style={styles.gridItem}><Image source={{ uri: item.image }} style={styles.gridImg} /></TouchableOpacity>}
          ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyText}>No posts yet</Text></View>}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1628' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  profileTop: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  avatar: { width: 84, height: 84, borderRadius: 42, marginRight: 24 },
  statsRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  statLbl: { fontSize: 13, color: '#6B82A6', marginTop: 2 },
  bio: { paddingHorizontal: 16, marginBottom: 16 },
  fullName: { fontSize: 15, fontWeight: '600', color: '#FFFFFF', marginBottom: 4 },
  bioText: { fontSize: 14, color: '#CBD5E1', lineHeight: 20 },
  actions: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, gap: 8 },
  actionBtn: { flex: 1, backgroundColor: '#D4AF37', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  followingBtn: { backgroundColor: '#0F1D32' },
  actionText: { color: '#0A1628', fontWeight: '600', fontSize: 14 },
  followingText: { color: '#FFFFFF' },
  actionBtnSecondary: { flex: 1, backgroundColor: '#0F1D32', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  actionTextSecondary: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  activeTab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#FFFFFF' },
  gridRow: { gap: 2, marginBottom: 2 },
  gridItem: { width: GRID, height: GRID },
  gridImg: { width: '100%', height: '100%' },
  empty: { padding: 60, alignItems: 'center' },
  emptyText: { color: '#3D5278', fontSize: 16 },
});
