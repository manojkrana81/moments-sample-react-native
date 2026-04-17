import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import api from '../../src/services/api';

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  profile_picture: string | null;
  followers_count: number;
  following_count: number;
  posts_count: number;
  is_following: boolean;
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (text: string) => {
    setQuery(text);
    
    if (text.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/api/users/search/${text.trim()}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string, isFollowing: boolean) => {
    try {
      if (isFollowing) {
        await api.post(`/api/users/${userId}/unfollow`);
      } else {
        await api.post(`/api/users/${userId}/follow`);
      }

      setResults((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                is_following: !isFollowing,
                followers_count: isFollowing
                  ? user.followers_count - 1
                  : user.followers_count + 1,
              }
            : user
        )
      );
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const renderUser = ({ item }: { item: UserProfile }) => (
    <TouchableOpacity style={styles.userItem}>
      <View style={styles.userInfo}>
        {item.profile_picture ? (
          <Image
            source={{ uri: item.profile_picture }}
            style={styles.avatar}
          />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Ionicons name="person" size={24} color="#999" />
          </View>
        )}
        <View style={styles.userDetails}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.fullName}>{item.full_name}</Text>
          <Text style={styles.stats}>
            {item.posts_count} posts • {item.followers_count} followers
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.followButton,
          item.is_following && styles.followingButton,
        ]}
        onPress={() => handleFollow(item.id, item.is_following)}
      >
        <Text
          style={[
            styles.followButtonText,
            item.is_following && styles.followingButtonText,
          ]}
        >
          {item.is_following ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={query}
            onChangeText={handleSearch}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : query.length >= 2 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="search" size={64} color="#CCC" />
          <Text style={styles.emptyText}>No users found</Text>
        </View>
      ) : (
        <View style={styles.centerContainer}>
          <Ionicons name="people" size={64} color="#CCC" />
          <Text style={styles.emptyText}>Search for users</Text>
          <Text style={styles.emptySubtext}>Find friends and follow them</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 8,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FAFAFA',
    marginRight: 12,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  fullName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  stats: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  followButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
  },
  followingButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  followingButtonText: {
    color: '#333',
  },
});
