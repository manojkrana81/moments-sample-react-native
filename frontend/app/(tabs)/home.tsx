import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl, Dimensions, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../src/contexts/AuthContext';
import { MOCK_POSTS, MOCK_STORIES, MockPost, MockStory, formatCount } from '../../src/data/mockData';
import { C } from '../../src/theme/colors';
import ActionSheet, { ActionItem } from '../../src/components/ActionSheet';
import { formatDistanceToNow } from 'date-fns';

const { width: W } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [stories] = useState(MOCK_STORIES);
  const [refreshing, setRefreshing] = useState(false);
  const [viewingStory, setViewingStory] = useState<MockStory | null>(null);
  const [menuPost, setMenuPost] = useState<MockPost | null>(null);

  const handleLike = (id: string) => {
    setPosts(p => p.map(x => x.id === id ? { ...x, is_liked: !x.is_liked, likes_count: x.is_liked ? x.likes_count - 1 : x.likes_count + 1 } : x));
  };

  const postActions: ActionItem[] = [
    { icon: 'bookmark-outline', label: 'Save Post', onPress: () => Alert.alert('Saved', 'Post saved to collection') },
    { icon: 'paper-plane-outline', label: 'Share Post', onPress: () => Alert.alert('Share', 'Share link copied') },
    { icon: 'link-outline', label: 'Copy Link', onPress: () => Alert.alert('Copied', 'Link copied to clipboard') },
    { icon: 'qr-code-outline', label: 'QR Code', onPress: () => Alert.alert('QR', 'QR code generated') },
    { icon: 'volume-mute-outline', label: 'Mute User', onPress: () => Alert.alert('Muted', 'User muted') },
    { icon: 'eye-off-outline', label: 'Hide Post', onPress: () => { if (menuPost) setPosts(p => p.filter(x => x.id !== menuPost.id)); Alert.alert('Hidden', 'Post hidden from feed'); } },
    { icon: 'flag-outline', label: 'Report', onPress: () => Alert.alert('Reported', 'Thank you for reporting'), danger: true },
  ];

  const renderStory = ({ item }: { item: MockStory }) => (
    <TouchableOpacity testID={`story-${item.id}`} style={s.storyItem} onPress={() => setViewingStory(item)}>
      <View style={[s.storyRing, item.is_viewed && s.storyViewed]}>
        <Image source={{ uri: item.user_profile_picture }} style={s.storyImg} />
      </View>
      <Text style={s.storyName} numberOfLines={1}>{item.username.split('.')[0]}</Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: { item: MockPost }) => (
    <View testID={`post-${item.id}`} style={s.postCard}>
      <View style={s.postHead}>
        <TouchableOpacity style={s.postUser} onPress={() => router.push({ pathname: '/user-profile', params: { userId: item.user_id } })}>
          <Image source={{ uri: item.user_profile_picture }} style={s.avatar} />
          <View><Text style={s.uname}>{item.username}</Text>{item.location && <Text style={s.loc}>{item.location}</Text>}</View>
        </TouchableOpacity>
        <TouchableOpacity testID={`post-menu-${item.id}`} onPress={() => setMenuPost(item)}>
          <Ionicons name="ellipsis-horizontal" size={20} color={C.textMuted} />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: item.image }} style={s.postImg} resizeMode="cover" />
      <View style={s.actions}>
        <View style={s.leftAct}>
          <TouchableOpacity testID={`like-${item.id}`} onPress={() => handleLike(item.id)} style={s.actBtn}>
            <Ionicons name={item.is_liked ? 'heart' : 'heart-outline'} size={26} color={item.is_liked ? C.danger : C.text} />
          </TouchableOpacity>
          <TouchableOpacity style={s.actBtn} onPress={() => router.push({ pathname: '/comments', params: { postId: item.id } })}>
            <Ionicons name="chatbubble-outline" size={24} color={C.text} />
          </TouchableOpacity>
          <TouchableOpacity style={s.actBtn}><Ionicons name="paper-plane-outline" size={24} color={C.text} /></TouchableOpacity>
        </View>
        <TouchableOpacity><Ionicons name="bookmark-outline" size={24} color={C.text} /></TouchableOpacity>
      </View>
      <View style={s.postInfo}>
        {item.likes_count > 0 && <Text style={s.likes}>{formatCount(item.likes_count)} likes</Text>}
        {item.caption && <Text style={s.caption}><Text style={s.capUser}>{item.username} </Text>{item.caption}</Text>}
        {item.comments_count > 0 && <TouchableOpacity onPress={() => router.push({ pathname: '/comments', params: { postId: item.id } })}><Text style={s.viewCmts}>View all {item.comments_count} comments</Text></TouchableOpacity>}
        <Text style={s.time}>{formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</Text>
      </View>
    </View>
  );

  return (
    <View style={s.container}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.logo}>Moments</Text>
        <View style={s.headerR}>
          <TouchableOpacity testID="notif-btn" style={s.hIcon} onPress={() => router.push('/notifications')}><Ionicons name="heart-outline" size={24} color={C.navy} /></TouchableOpacity>
          <TouchableOpacity testID="add-btn" style={s.hIcon} onPress={() => router.push('/add-post')}><Ionicons name="add-circle-outline" size={24} color={C.navy} /></TouchableOpacity>
        </View>
      </View>
      <FlatList data={posts} renderItem={renderPost} keyExtractor={i => i.id} showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={s.storiesWrap}><FlatList data={stories} renderItem={renderStory} keyExtractor={i => i.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.storiesList} /></View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 800); }} tintColor={C.navy} />}
      />
      {/* Post Action Sheet */}
      <ActionSheet visible={!!menuPost} onClose={() => setMenuPost(null)} title={menuPost?.username} actions={postActions} />
      {/* Story Viewer */}
      <Modal visible={!!viewingStory} animationType="fade" transparent>
        {viewingStory && (
          <View style={s.storyModal}>
            <Image source={{ uri: viewingStory.image }} style={s.storyFull} resizeMode="cover" />
            <View style={[s.storyHead, { top: insets.top + 12 }]}>
              <View style={s.storyUser}><Image source={{ uri: viewingStory.user_profile_picture }} style={s.storyHeadAvatar} /><Text style={s.storyHeadName}>{viewingStory.username}</Text></View>
              <TouchableOpacity testID="close-story" onPress={() => setViewingStory(null)}><Ionicons name="close" size={28} color="#FFF" /></TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  logo: { fontSize: 26, fontWeight: '700', color: C.navy, fontStyle: 'italic', letterSpacing: 1 },
  headerR: { flexDirection: 'row' },
  hIcon: { marginLeft: 18 },
  storiesWrap: { borderBottomWidth: 1, borderBottomColor: C.border, paddingVertical: 12 },
  storiesList: { paddingHorizontal: 12 },
  storyItem: { alignItems: 'center', marginHorizontal: 6, width: 72 },
  storyRing: { width: 66, height: 66, borderRadius: 33, borderWidth: 2.5, borderColor: C.navy, padding: 2, justifyContent: 'center', alignItems: 'center' },
  storyViewed: { borderColor: C.border },
  storyImg: { width: 56, height: 56, borderRadius: 28 },
  storyName: { fontSize: 11, color: C.textSoft, marginTop: 4, textAlign: 'center' },
  postCard: { marginBottom: 4, backgroundColor: C.bg },
  postHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10 },
  postUser: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 34, height: 34, borderRadius: 17, marginRight: 10 },
  uname: { fontSize: 14, fontWeight: '600', color: C.text },
  loc: { fontSize: 11, color: C.textMuted, marginTop: 1 },
  postImg: { width: W, height: W, backgroundColor: C.surface },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8 },
  leftAct: { flexDirection: 'row' },
  actBtn: { marginRight: 14 },
  postInfo: { paddingHorizontal: 14, paddingBottom: 12 },
  likes: { fontSize: 14, fontWeight: '600', color: C.text, marginBottom: 4 },
  caption: { fontSize: 14, color: C.textSoft, lineHeight: 20 },
  capUser: { fontWeight: '700', color: C.text },
  viewCmts: { fontSize: 14, color: C.textMuted, marginTop: 4 },
  time: { fontSize: 11, color: C.textDim, marginTop: 6 },
  storyModal: { flex: 1, backgroundColor: '#000' },
  storyFull: { width: '100%', height: '100%' },
  storyHead: { position: 'absolute', left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  storyUser: { flexDirection: 'row', alignItems: 'center' },
  storyHeadAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8, borderWidth: 1.5, borderColor: '#FFF' },
  storyHeadName: { color: '#FFF', fontWeight: '600', fontSize: 14 },
});
