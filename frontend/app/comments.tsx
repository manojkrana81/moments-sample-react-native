import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_POSTS, MockComment } from '../src/data/mockData';
import { formatDistanceToNow } from 'date-fns';

export default function CommentsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const post = MOCK_POSTS.find(p => p.id === postId) || MOCK_POSTS[0];
  const [comments, setComments] = useState<MockComment[]>(post.comments);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (!newComment.trim()) return;
    const comment: MockComment = {
      id: `c_${Date.now()}`, user_id: 'me', username: 'you', profile_picture: '', text: newComment.trim(), created_at: new Date().toISOString(), likes_count: 0,
    };
    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const renderComment = ({ item }: { item: MockComment }) => (
    <View testID={`comment-${item.id}`} style={styles.commentItem}>
      <Image source={{ uri: item.profile_picture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' }} style={styles.avatar} />
      <View style={styles.commentBody}>
        <Text style={styles.commentText}>
          <Text style={styles.commentUser}>{item.username} </Text>{item.text}
        </Text>
        <View style={styles.commentMeta}>
          <Text style={styles.commentTime}>{formatDistanceToNow(new Date(item.created_at), { addSuffix: false })}</Text>
          {item.likes_count > 0 && <Text style={styles.commentLikes}>{item.likes_count} likes</Text>}
          <TouchableOpacity><Text style={styles.replyBtn}>Reply</Text></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.commentLikeBtn}><Ionicons name="heart-outline" size={14} color="#3D5278" /></TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity testID="back-comments-btn" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comments</Text>
        <TouchableOpacity><Ionicons name="paper-plane-outline" size={22} color="#FFFFFF" /></TouchableOpacity>
      </View>
      {/* Original post caption */}
      <View style={styles.captionSection}>
        <Image source={{ uri: post.user_profile_picture }} style={styles.avatar} />
        <View style={styles.commentBody}>
          <Text style={styles.commentText}>
            <Text style={styles.commentUser}>{post.username} </Text>{post.caption}
          </Text>
          <Text style={styles.commentTime}>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <FlatList data={comments} renderItem={renderComment} keyExtractor={item => item.id} contentContainerStyle={styles.commentsList} showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyText}>No comments yet. Be the first!</Text></View>}
      />
      <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        <View style={styles.inputRow}>
          <TextInput testID="comment-input" style={styles.input} placeholder="Add a comment..." value={newComment} onChangeText={setNewComment} placeholderTextColor="#3D5278" />
          <TouchableOpacity testID="post-comment-btn" onPress={addComment} disabled={!newComment.trim()}>
            <Text style={[styles.postBtn, !newComment.trim() && styles.postBtnDisabled]}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1628' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  captionSection: { flexDirection: 'row', padding: 16, gap: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  commentBody: { flex: 1 },
  commentText: { fontSize: 14, color: '#FFFFFF', lineHeight: 18 },
  commentUser: { fontWeight: '700' },
  commentMeta: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 },
  commentTime: { fontSize: 12, color: '#3D5278' },
  commentLikes: { fontSize: 12, color: '#3D5278', fontWeight: '600' },
  replyBtn: { fontSize: 12, color: '#3D5278', fontWeight: '600' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)' },
  commentsList: { paddingVertical: 8 },
  commentItem: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, gap: 12 },
  commentLikeBtn: { paddingTop: 4 },
  empty: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#3D5278', fontSize: 14 },
  inputBar: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 16, paddingTop: 8, backgroundColor: '#0A1628' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#0F1D32', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, marginRight: 8, color: '#FFFFFF' },
  postBtn: { color: '#D4AF37', fontWeight: '700', fontSize: 14 },
  postBtnDisabled: { color: '#3D5278' },
});
