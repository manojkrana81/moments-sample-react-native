import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_CONVERSATIONS, MockConversation } from '../../src/data/mockData';
import { formatDistanceToNow } from 'date-fns';

export default function MessagesScreen() {
  const [conversations] = useState(MOCK_CONVERSATIONS);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const renderConv = ({ item }: { item: MockConversation }) => (
    <TouchableOpacity testID={`conv-${item.user_id}`} style={styles.convItem} onPress={() => router.push({ pathname: '/chat', params: { userId: item.user_id } })}>
      <View style={styles.avatarWrap}>
        <Image source={{ uri: item.profile_picture }} style={styles.avatar} />
        {item.is_online && <View style={styles.onlineDot} />}
      </View>
      <View style={styles.convInfo}>
        <View style={styles.convTop}>
          <Text style={[styles.username, item.unread_count > 0 && styles.bold]}>{item.username}</Text>
          <Text style={styles.time}>{formatDistanceToNow(new Date(item.last_message_time), { addSuffix: false })}</Text>
        </View>
        <View style={styles.convBottom}>
          <Text style={[styles.lastMsg, item.unread_count > 0 && styles.unreadMsg]} numberOfLines={1}>{item.last_message}</Text>
          {item.unread_count > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{item.unread_count}</Text></View>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity testID="new-chat-btn"><Ionicons name="create-outline" size={24} color="#2C3E50" /></TouchableOpacity>
      </View>
      <FlatList data={conversations} renderItem={renderConv} keyExtractor={item => item.user_id} showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={styles.empty}><Ionicons name="chatbubbles-outline" size={56} color="#D0D0D0" /><Text style={styles.emptyText}>No messages yet</Text></View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#2C3E50' },
  convItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  avatarWrap: { position: 'relative' },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  onlineDot: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#27AE60', borderWidth: 2, borderColor: '#FFF' },
  convInfo: { flex: 1 },
  convTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  username: { fontSize: 15, fontWeight: '500', color: '#2C3E50' },
  bold: { fontWeight: '700' },
  time: { fontSize: 12, color: '#95A5A6' },
  convBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  lastMsg: { fontSize: 14, color: '#7F8C8D', flex: 1 },
  unreadMsg: { fontWeight: '600', color: '#2C3E50' },
  badge: { backgroundColor: '#4A90E2', borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6, marginLeft: 8 },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  empty: { alignItems: 'center', paddingVertical: 80 },
  emptyText: { fontSize: 16, color: '#95A5A6', marginTop: 12 },
});
