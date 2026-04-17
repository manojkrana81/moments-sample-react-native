import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, FlatList, Image,
  TouchableOpacity, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_USERS, MOCK_POSTS, MockUser, MockPost } from '../../src/data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_SIZE = (SCREEN_WIDTH - 4) / 3;

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MockUser[]>([]);
  const [users, setUsers] = useState<MockUser[]>(MOCK_USERS);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim().length < 1) {
      setResults([]);
      return;
    }
    const filtered = users.filter(
      u =>
        u.username.toLowerCase().includes(text.toLowerCase()) ||
        u.full_name.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  const handleFollow = (userId: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === userId
          ? {
              ...u,
              is_following: !u.is_following,
              followers_count: u.is_following ? u.followers_count - 1 : u.followers_count + 1,
            }
          : u
      )
    );
    setResults(prev =>
      prev.map(u =>
        u.id === userId
          ? {
              ...u,
              is_following: !u.is_following,
              followers_count: u.is_following ? u.followers_count - 1 : u.followers_count + 1,
            }
          : u
      )
    );
  };

  const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString());

  const renderUser = ({ item }: { item: MockUser }) => (
    <TouchableOpacity testID={`user-${item.id}`} style={styles.userItem}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.profile_picture }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.fullName}>{item.full_name}</Text>
          <Text style={styles.stats}>
            {item.posts_count} posts {'\u2022'} {formatCount(item.followers_count)} followers
          </Text>
        </View>
      </View>
      <TouchableOpacity
        testID={`follow-btn-${item.id}`}
        style={[styles.followButton, item.is_following && styles.followingButton]}
        onPress={() => handleFollow(item.id)}
      >
        <Text style={[styles.followButtonText, item.is_following && styles.followingButtonText]}>
          {item.is_following ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderExploreItem = ({ item, index }: { item: MockPost; index: number }) => (
    <TouchableOpacity testID={`explore-post-${item.id}`} style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.gridImage} />
    </TouchableOpacity>
  );

  const showSearch = query.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#95A5A6" style={styles.searchIcon} />
          <TextInput
            testID="search-input"
            style={styles.searchInput}
            placeholder="Search users..."
            value={query}
            onChangeText={handleSearch}
            autoCapitalize="none"
            placeholderTextColor="#95A5A6"
          />
          {query.length > 0 && (
            <TouchableOpacity testID="clear-search-btn" onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={18} color="#95A5A6" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showSearch ? (
        results.length > 0 ? (
          <FlatList
            key="search-results"
            data={results}
            renderItem={renderUser}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.centerContainer}>
            <Ionicons name="search" size={56} color="#D0D0D0" />
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        )
      ) : (
        <FlatList
          key="explore-grid"
          data={MOCK_POSTS}
          renderItem={renderExploreItem}
          keyExtractor={item => item.id}
          numColumns={3}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    paddingHorizontal: 16, paddingTop: 48, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0', backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F6F7',
    borderRadius: 10, paddingHorizontal: 12, height: 40,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#2C3E50' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyText: { fontSize: 16, color: '#95A5A6', marginTop: 12 },
  listContent: { paddingVertical: 8 },
  userItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: 52, height: 52, borderRadius: 26, marginRight: 12, backgroundColor: '#F0F0F0' },
  userDetails: { flex: 1 },
  username: { fontSize: 15, fontWeight: '600', color: '#2C3E50' },
  fullName: { fontSize: 13, color: '#7F8C8D', marginTop: 2 },
  stats: { fontSize: 12, color: '#95A5A6', marginTop: 3 },
  followButton: { backgroundColor: '#4A90E2', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 },
  followingButton: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E0E0E0' },
  followButtonText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  followingButtonText: { color: '#2C3E50' },
  gridRow: { gap: 2, marginBottom: 2 },
  gridItem: { width: GRID_SIZE, height: GRID_SIZE },
  gridImage: { width: '100%', height: '100%', backgroundColor: '#F5F5F5' },
});
