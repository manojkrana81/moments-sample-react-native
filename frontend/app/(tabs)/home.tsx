import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../src/contexts/AuthContext';
import { MOCK_POSTS, MOCK_STORIES, MockPost, MockStory } from '../../src/data/mockData';
import { formatDistanceToNow } from 'date-fns';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [posts, setPosts] = useState<MockPost[]>(MOCK_POSTS);
  const [stories] = useState<MockStory[]>(MOCK_STORIES);
  const [refreshing, setRefreshing] = useState(false);
  const [viewingStory, setViewingStory] = useState<MockStory | null>(null);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              is_liked: !post.is_liked,
              likes_count: post.is_liked ? post.likes_count - 1 : post.likes_count + 1,
            }
          : post
      )
    );
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const renderStory = ({ item }: { item: MockStory }) => (
    <TouchableOpacity
      testID={`story-${item.id}`}
      style={styles.storyItem}
      onPress={() => setViewingStory(item)}
    >
      <View style={[styles.storyRing, item.is_viewed && styles.storyViewed]}>
        <Image source={{ uri: item.user_profile_picture }} style={styles.storyImage} />
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {item.username.split('.')[0]}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: { item: MockPost }) => (
    <View testID={`post-${item.id}`} style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postUserInfo}>
          <Image source={{ uri: item.user_profile_picture }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{item.username}</Text>
            {item.location && <Text style={styles.location}>{item.location}</Text>}
          </View>
        </View>
        <TouchableOpacity testID={`post-menu-${item.id}`}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="cover" />

      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity
            testID={`like-btn-${item.id}`}
            onPress={() => handleLike(item.id)}
            style={styles.actionButton}
          >
            <Ionicons
              name={item.is_liked ? 'heart' : 'heart-outline'}
              size={28}
              color={item.is_liked ? '#FF3B30' : '#333'}
            />
          </TouchableOpacity>
          <TouchableOpacity testID={`comment-btn-${item.id}`} style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={26} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity testID={`share-btn-${item.id}`} style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity testID={`bookmark-btn-${item.id}`}>
          <Ionicons name="bookmark-outline" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.postInfo}>
        {item.likes_count > 0 && (
          <Text style={styles.likes}>{formatCount(item.likes_count)} likes</Text>
        )}
        {item.caption && (
          <Text style={styles.caption}>
            <Text style={styles.captionUsername}>{item.username} </Text>
            {item.caption}
          </Text>
        )}
        {item.comments_count > 0 && (
          <Text style={styles.viewComments}>
            View all {item.comments_count} comments
          </Text>
        )}
        <Text style={styles.timestamp}>
          {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
        </Text>
      </View>
    </View>
  );

  const ListHeader = () => (
    <View style={styles.storiesContainer}>
      <FlatList
        data={stories}
        renderItem={renderStory}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesList}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Moments</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity testID="notifications-btn" style={styles.headerIcon} onPress={() => router.push('/notifications')}>
            <Ionicons name="heart-outline" size={26} color="#2C3E50" />
          </TouchableOpacity>
          <TouchableOpacity testID="dm-btn" style={styles.headerIcon} onPress={() => router.push('/add-post')}>
            <Ionicons name="add-circle-outline" size={26} color="#2C3E50" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="images-outline" size={64} color="#CCC" />
            <Text style={styles.emptyText}>No posts yet</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#4A90E2" />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Story Viewer Modal */}
      <Modal visible={!!viewingStory} animationType="fade" transparent>
        {viewingStory && (
          <View style={styles.storyModal}>
            <Image source={{ uri: viewingStory.image }} style={styles.storyFullImage} resizeMode="cover" />
            <View style={styles.storyModalHeader}>
              <View style={styles.storyModalUser}>
                <Image source={{ uri: viewingStory.user_profile_picture }} style={styles.storyModalAvatar} />
                <Text style={styles.storyModalUsername}>{viewingStory.username}</Text>
                <Text style={styles.storyModalTime}>
                  {formatDistanceToNow(new Date(viewingStory.created_at), { addSuffix: true })}
                </Text>
              </View>
              <TouchableOpacity testID="close-story-btn" onPress={() => setViewingStory(null)}>
                <Ionicons name="close" size={28} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#2C3E50', fontStyle: 'italic' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: { marginLeft: 20 },
  storiesContainer: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingVertical: 12 },
  storiesList: { paddingHorizontal: 12 },
  storyItem: { alignItems: 'center', marginHorizontal: 6, width: 72 },
  storyRing: {
    width: 68, height: 68, borderRadius: 34,
    borderWidth: 2.5, borderColor: '#4A90E2',
    padding: 2, justifyContent: 'center', alignItems: 'center',
  },
  storyViewed: { borderColor: '#D0D0D0' },
  storyImage: { width: 58, height: 58, borderRadius: 29 },
  storyUsername: { fontSize: 11, color: '#555', marginTop: 4, textAlign: 'center' },
  postCard: { marginBottom: 8, backgroundColor: '#FFFFFF' },
  postHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 10,
  },
  postUserInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10, backgroundColor: '#F0F0F0' },
  username: { fontSize: 14, fontWeight: '600', color: '#2C3E50' },
  location: { fontSize: 12, color: '#7F8C8D', marginTop: 1 },
  postImage: { width: SCREEN_WIDTH, height: SCREEN_WIDTH, backgroundColor: '#F5F5F5' },
  postActions: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 8,
  },
  leftActions: { flexDirection: 'row', alignItems: 'center' },
  actionButton: { marginRight: 16 },
  postInfo: { paddingHorizontal: 14, paddingBottom: 12 },
  likes: { fontSize: 14, fontWeight: '600', color: '#2C3E50', marginBottom: 4 },
  caption: { fontSize: 14, color: '#2C3E50', lineHeight: 20 },
  captionUsername: { fontWeight: '600' },
  viewComments: { fontSize: 14, color: '#7F8C8D', marginTop: 4 },
  timestamp: { fontSize: 11, color: '#95A5A6', marginTop: 6 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 64 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#666', marginTop: 16 },
  storyModal: { flex: 1, backgroundColor: '#000' },
  storyFullImage: { width: '100%', height: '100%' },
  storyModalHeader: {
    position: 'absolute', top: 48, left: 16, right: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  storyModalUser: { flexDirection: 'row', alignItems: 'center' },
  storyModalAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8, borderWidth: 1, borderColor: '#FFF' },
  storyModalUsername: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  storyModalTime: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginLeft: 8 },
});
