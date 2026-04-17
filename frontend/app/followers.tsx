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
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
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
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#2C3E50' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#2C3E50' },
  tabText: { fontSize: 15, color: '#95A5A6', fontWeight: '600' },
  activeTabText: { color: '#2C3E50' },
  userItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  userInfo: { flex: 1 },
  username: { fontSize: 15, fontWeight: '600', color: '#2C3E50' },
  fullName: { fontSize: 13, color: '#7F8C8D', marginTop: 2 },
  followBtn: { backgroundColor: '#4A90E2', paddingHorizontal: 20, paddingVertical: 7, borderRadius: 8 },
  followingBtn: { backgroundColor: '#F5F6F7' },
  followText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  followingText: { color: '#2C3E50' },
});
