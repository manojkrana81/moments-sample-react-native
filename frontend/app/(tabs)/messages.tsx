import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_CONVERSATIONS, MockConversation } from '../../src/data/mockData';
import { C } from '../../src/theme/colors';
import { formatDistanceToNow } from 'date-fns';

export default function MessagesScreen() {
  const [conversations] = useState(MOCK_CONVERSATIONS);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={s.container}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.title}>Messages</Text>
        <TouchableOpacity testID="new-chat"><Ionicons name="create-outline" size={24} color={C.gold} /></TouchableOpacity>
      </View>
      <FlatList data={conversations} keyExtractor={i => i.user_id} showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={s.empty}><Ionicons name="chatbubbles-outline" size={56} color={C.textDim} /><Text style={s.emptyTxt}>No messages</Text></View>}
        renderItem={({ item }) => (
          <TouchableOpacity testID={`conv-${item.user_id}`} style={s.conv} onPress={() => router.push({ pathname: '/chat', params: { userId: item.user_id } })}>
            <View style={s.avatarWrap}><Image source={{ uri: item.profile_picture }} style={s.avatar} />{item.is_online && <View style={s.online} />}</View>
            <View style={s.convInfo}>
              <View style={s.convTop}><Text style={[s.uname, item.unread_count > 0 && s.bold]}>{item.username}</Text><Text style={s.time}>{formatDistanceToNow(new Date(item.last_message_time), { addSuffix: false })}</Text></View>
              <View style={s.convBot}><Text style={[s.lastMsg, item.unread_count > 0 && s.unread]} numberOfLines={1}>{item.last_message}</Text>
                {item.unread_count > 0 && <View style={s.badge}><Text style={s.badgeTxt}>{item.unread_count}</Text></View>}</View>
            </View>
          </TouchableOpacity>
        )} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: C.goldBorder },
  title: { fontSize: 24, fontWeight: '700', color: C.text },
  conv: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  avatarWrap: { position: 'relative' },
  avatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: C.goldBorder },
  online: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: C.success, borderWidth: 2, borderColor: C.bg },
  convInfo: { flex: 1 },
  convTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  uname: { fontSize: 15, fontWeight: '500', color: C.text },
  bold: { fontWeight: '700' },
  time: { fontSize: 12, color: C.textDim },
  convBot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  lastMsg: { fontSize: 14, color: C.textMuted, flex: 1 },
  unread: { fontWeight: '600', color: C.textSoft },
  badge: { backgroundColor: C.gold, borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6, marginLeft: 8 },
  badgeTxt: { color: C.bg, fontSize: 11, fontWeight: '700' },
  empty: { alignItems: 'center', paddingVertical: 80 },
  emptyTxt: { color: C.textMuted, fontSize: 16, marginTop: 12 },
});
