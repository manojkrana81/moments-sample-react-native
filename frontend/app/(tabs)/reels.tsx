import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_REELS, MockReel, formatCount } from '../../src/data/mockData';
import { C } from '../../src/theme/colors';
const { width: W, height: H } = Dimensions.get('window');

export default function ReelsScreen() {
  const [reels, setReels] = useState(MOCK_REELS);
  const insets = useSafeAreaInsets();
  const TAB_H = 52 + insets.bottom;
  const REEL_H = H - TAB_H;
  const handleLike = (id: string) => { setReels(p => p.map(r => r.id === id ? { ...r, is_liked: !r.is_liked, likes_count: r.is_liked ? r.likes_count - 1 : r.likes_count + 1 } : r)); };

  return (
    <View style={s.container}>
      <View style={[s.reelHeader, { top: insets.top || 12 }]}><Text style={s.reelTitle}>Reels</Text><TouchableOpacity><Ionicons name="camera-outline" size={26} color={C.gold} /></TouchableOpacity></View>
      <FlatList data={reels} keyExtractor={i => i.id} pagingEnabled snapToInterval={REEL_H} decelerationRate="fast" showsVerticalScrollIndicator={false}
        getItemLayout={(_, i) => ({ length: REEL_H, offset: REEL_H * i, index: i })}
        renderItem={({ item }) => (
          <View testID={`reel-${item.id}`} style={[s.reel, { height: REEL_H }]}>
            <Image source={{ uri: item.image }} style={[s.reelImg, { height: REEL_H }]} resizeMode="cover" />
            <View style={s.overlay}>
              <View style={s.rightAct}>
                <TouchableOpacity testID={`rl-${item.id}`} style={s.rAct} onPress={() => handleLike(item.id)}>
                  <Ionicons name={item.is_liked ? 'heart' : 'heart-outline'} size={28} color={item.is_liked ? C.danger : '#FFF'} /><Text style={s.rCount}>{formatCount(item.likes_count)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.rAct}><Ionicons name="chatbubble-outline" size={26} color="#FFF" /><Text style={s.rCount}>{formatCount(item.comments_count)}</Text></TouchableOpacity>
                <TouchableOpacity style={s.rAct}><Ionicons name="paper-plane-outline" size={26} color="#FFF" /><Text style={s.rCount}>{formatCount(item.shares_count)}</Text></TouchableOpacity>
                <TouchableOpacity style={s.rAct}><Ionicons name="ellipsis-vertical" size={22} color="#FFF" /></TouchableOpacity>
              </View>
              <View style={s.botInfo}>
                <View style={s.reelUser}><Image source={{ uri: item.user_profile_picture }} style={s.reelAvatar} /><Text style={s.reelUname}>{item.username}</Text>
                  <TouchableOpacity style={s.followPill}><Text style={s.followPillTxt}>Follow</Text></TouchableOpacity></View>
                <Text style={s.reelCap} numberOfLines={2}>{item.caption}</Text>
                <View style={s.audioRow}><Ionicons name="musical-notes" size={13} color={C.gold} /><Text style={s.audioTxt} numberOfLines={1}>{item.audio}</Text></View>
              </View>
            </View>
          </View>
        )} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  reelHeader: { position: 'absolute', left: 16, right: 16, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reelTitle: { fontSize: 22, fontWeight: '700', color: C.gold },
  reel: { width: W, position: 'relative' },
  reelImg: { width: W, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  rightAct: { position: 'absolute', right: 12, bottom: 80, alignItems: 'center', gap: 16 },
  rAct: { alignItems: 'center' },
  rCount: { color: '#FFF', fontSize: 12, fontWeight: '600', marginTop: 2 },
  botInfo: { padding: 16, paddingBottom: 20, paddingRight: 70 },
  reelUser: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  reelAvatar: { width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: C.gold },
  reelUname: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  followPill: { borderWidth: 1, borderColor: C.gold, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 },
  followPillTxt: { color: C.gold, fontSize: 12, fontWeight: '600' },
  reelCap: { color: '#FFF', fontSize: 14, lineHeight: 18, marginBottom: 8 },
  audioRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  audioTxt: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
});
