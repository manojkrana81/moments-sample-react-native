import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,
  Dimensions, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { MOCK_POSTS, MockPost } from '../../src/data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_SIZE = (SCREEN_WIDTH - 4) / 3;

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'grid' | 'saved'>('grid');

  // Use a subset of mock posts for the user's profile
  const userPosts = MOCK_POSTS.slice(0, 6);

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const formatCount = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
  };

  if (!user) return null;

  const renderGridItem = ({ item }: { item: MockPost }) => (
    <TouchableOpacity testID={`profile-post-${item.id}`} style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.gridImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{user.username}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity testID="settings-btn" style={styles.headerIcon}>
            <Ionicons name="menu-outline" size={28} color="#2C3E50" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileTop}>
            <View style={styles.avatarContainer}>
              {user.profile_picture ? (
                <Image source={{ uri: user.profile_picture }} style={styles.profileImage} />
              ) : (
                <View style={[styles.profileImage, styles.profilePlaceholder]}>
                  <Text style={styles.profileInitial}>
                    {user.full_name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userPosts.length}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{formatCount(user.followers_count)}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{formatCount(user.following_count)}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          <View style={styles.bioSection}>
            <Text style={styles.fullName}>{user.full_name}</Text>
            {user.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity testID="edit-profile-btn" style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity testID="share-profile-btn" style={styles.editButton}>
              <Text style={styles.editButtonText}>Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity testID="logout-btn" style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={18} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            testID="grid-tab"
            style={[styles.tab, selectedTab === 'grid' && styles.activeTab]}
            onPress={() => setSelectedTab('grid')}
          >
            <Ionicons name="grid" size={22} color={selectedTab === 'grid' ? '#2C3E50' : '#95A5A6'} />
          </TouchableOpacity>
          <TouchableOpacity
            testID="saved-tab"
            style={[styles.tab, selectedTab === 'saved' && styles.activeTab]}
            onPress={() => setSelectedTab('saved')}
          >
            <Ionicons name="bookmark" size={22} color={selectedTab === 'saved' ? '#2C3E50' : '#95A5A6'} />
          </TouchableOpacity>
        </View>

        {/* Grid */}
        {selectedTab === 'grid' ? (
          userPosts.length > 0 ? (
            <FlatList
              data={userPosts}
              renderItem={renderGridItem}
              keyExtractor={item => item.id}
              numColumns={3}
              scrollEnabled={false}
              columnWrapperStyle={styles.gridRow}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="camera-outline" size={56} color="#D0D0D0" />
              <Text style={styles.emptyTitle}>No posts yet</Text>
              <Text style={styles.emptySubtext}>Share your first moment</Text>
            </View>
          )
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={56} color="#D0D0D0" />
            <Text style={styles.emptyTitle}>No saved posts</Text>
            <Text style={styles.emptySubtext}>Save posts you want to see again</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 48, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#2C3E50' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: { marginLeft: 16 },
  profileSection: { padding: 16 },
  profileTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatarContainer: { marginRight: 24 },
  profileImage: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#F0F0F0' },
  profilePlaceholder: {
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#4A90E2',
  },
  profileInitial: { fontSize: 36, fontWeight: '700', color: '#FFF' },
  statsRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#2C3E50' },
  statLabel: { fontSize: 13, color: '#7F8C8D', marginTop: 2 },
  bioSection: { marginBottom: 16 },
  fullName: { fontSize: 15, fontWeight: '600', color: '#2C3E50', marginBottom: 4 },
  bio: { fontSize: 14, color: '#555', lineHeight: 20 },
  buttonRow: { flexDirection: 'row', gap: 8 },
  editButton: {
    flex: 1, paddingVertical: 8, backgroundColor: '#F5F6F7', borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: { fontSize: 14, fontWeight: '600', color: '#2C3E50' },
  logoutButton: {
    paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFF0F0',
    borderRadius: 8, justifyContent: 'center', alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F0F0F0',
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#2C3E50' },
  gridRow: { gap: 2, marginBottom: 2 },
  gridItem: { width: GRID_SIZE, height: GRID_SIZE },
  gridImage: { width: '100%', height: '100%', backgroundColor: '#F5F5F5' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: '#7F8C8D', marginTop: 12 },
  emptySubtext: { fontSize: 14, color: '#95A5A6', marginTop: 4 },
});
