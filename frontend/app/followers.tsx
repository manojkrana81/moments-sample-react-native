import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_USERS, MockUser } from '../src/data/mockData';

export default function FollowersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { tab } = useLocalSearchParams<{ tab: string }>();
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(tab === 'following' ? 'following' : 'followers');
  const [users, setUsers] = useState(MOCK_USERS);

  const toggleFollow = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, is_following: !u.is_following } : u));
  };

  const renderUser = ({ item }: { item: MockUser }) => (
    <TouchableOpacity testID={`follower-${item.id}`} style={styles.userItem} onPress={() => router.push({ pathname: '/user-profile', params: { userId: item.id } })}>
      <Image source={{ uri: item.profile_picture }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.fullName}>{item.full_name}</Text>
      </View>
      <TouchableOpacity testID={`follow-toggle-${item.id}`} style={[styles.followBtn, item.is_following && styles.followingBtn]} onPress={() => toggleFollow(item.id)}>
        <Text style={[styles.followText, item.is_following && styles.followingText]}>{item.is_following ? 'Following' : 'Follow'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity testID="back-followers-btn" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connections</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, activeTab === 'followers' && styles.activeTab]} onPress={() => setActiveTab('followers')}>
          <Text style={[styles.tabText, activeTab === 'followers' && styles.activeTabText]}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'following' && styles.activeTab]} onPress={() => setActiveTab('following')}>
          <Text style={[styles.tabText, activeTab === 'following' && styles.activeTabText]}>Following</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={users} renderItem={renderUser} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1628' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#FFFFFF' },
  tabText: { fontSize: 15, color: '#3D5278', fontWeight: '600' },
  activeTabText: { color: '#FFFFFF' },
  userItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  userInfo: { flex: 1 },
  username: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  fullName: { fontSize: 13, color: '#6B82A6', marginTop: 2 },
  followBtn: { backgroundColor: '#D4AF37', paddingHorizontal: 20, paddingVertical: 7, borderRadius: 8 },
  followingBtn: { backgroundColor: '#0F1D32' },
  followText: { color: '#0A1628', fontSize: 13, fontWeight: '600' },
  followingText: { color: '#FFFFFF' },
});
