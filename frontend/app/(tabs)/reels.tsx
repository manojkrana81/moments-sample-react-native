import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_REELS, MockReel, formatCount } from '../../src/data/mockData';

const { width: W, height: H } = Dimensions.get('window');

export default function ReelsScreen() {
  const [reels, setReels] = useState(MOCK_REELS);
  const [activeIndex, setActiveIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 50 + insets.bottom;
  const REEL_HEIGHT = H - TAB_BAR_HEIGHT;

  const handleLike = (id: string) => {
    setReels(prev => prev.map(r => r.id === id ? { ...r, is_liked: !r.is_liked, likes_count: r.is_liked ? r.likes_count - 1 : r.likes_count + 1 } : r));
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) setActiveIndex(viewableItems[0].index || 0);
  }).current;

  const renderReel = ({ item, index }: { item: MockReel; index: number }) => (
    <View testID={`reel-${item.id}`} style={[styles.reelContainer, { height: REEL_HEIGHT }]}>
      <Image source={{ uri: item.image }} style={[styles.reelImage, { height: REEL_HEIGHT }]} resizeMode="cover" />
      <View style={styles.overlay}>
        {/* Right side actions */}
        <View style={styles.rightActions}>
          <TouchableOpacity testID={`reel-like-${item.id}`} style={styles.reelAction} onPress={() => handleLike(item.id)}>
            <Ionicons name={item.is_liked ? 'heart' : 'heart-outline'} size={30} color={item.is_liked ? '#FF3B30' : '#FFF'} />
            <Text style={styles.actionCount}>{formatCount(item.likes_count)}</Text>
          </TouchableOpacity>
          <TouchableOpacity testID={`reel-comment-${item.id}`} style={styles.reelAction}>
            <Ionicons name="chatbubble-outline" size={28} color="#FFF" />
            <Text style={styles.actionCount}>{formatCount(item.comments_count)}</Text>
          </TouchableOpacity>
          <TouchableOpacity testID={`reel-share-${item.id}`} style={styles.reelAction}>
            <Ionicons name="paper-plane-outline" size={28} color="#FFF" />
            <Text style={styles.actionCount}>{formatCount(item.shares_count)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reelAction}>
            <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        {/* Bottom info */}
        <View style={styles.bottomInfo}>
          <View style={styles.reelUser}>
            <Image source={{ uri: item.user_profile_picture }} style={styles.reelAvatar} />
            <Text style={styles.reelUsername}>{item.username}</Text>
            <TouchableOpacity style={styles.followPill}>
              <Text style={styles.followPillText}>Follow</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.reelCaption} numberOfLines={2}>{item.caption}</Text>
          <View style={styles.audioRow}>
            <Ionicons name="musical-notes" size={14} color="#FFF" />
            <Text style={styles.audioText} numberOfLines={1}>{item.audio}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.reelHeader, { top: insets.top || 12 }]}>
        <Text style={styles.reelHeaderTitle}>Reels</Text>
        <TouchableOpacity><Ionicons name="camera-outline" size={28} color="#FFF" /></TouchableOpacity>
      </View>
      <FlatList
        data={reels}
        renderItem={renderReel}
        keyExtractor={item => item.id}
        pagingEnabled
        snapToInterval={REEL_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        getItemLayout={(_, index) => ({ length: REEL_HEIGHT, offset: REEL_HEIGHT * index, index })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  reelHeader: { position: 'absolute', left: 16, right: 16, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reelHeaderTitle: { fontSize: 22, fontWeight: '700', color: '#FFF' },
  reelContainer: { width: W, position: 'relative' },
  reelImage: { width: W, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  rightActions: { position: 'absolute', right: 12, bottom: 80, alignItems: 'center', gap: 18 },
  reelAction: { alignItems: 'center' },
  actionCount: { color: '#FFF', fontSize: 12, fontWeight: '600', marginTop: 2 },
  bottomInfo: { padding: 16, paddingBottom: 20, paddingRight: 72 },
  reelUser: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  reelAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: '#FFF' },
  reelUsername: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  followPill: { borderWidth: 1, borderColor: '#FFF', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 },
  followPillText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  reelCaption: { color: '#FFF', fontSize: 14, lineHeight: 18, marginBottom: 8 },
  audioRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  audioText: { color: '#FFF', fontSize: 13 },
});
