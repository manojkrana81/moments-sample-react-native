import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, MockMessage } from '../src/data/mockData';
import { formatDistanceToNow } from 'date-fns';

export default function ChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const conv = MOCK_CONVERSATIONS.find(c => c.user_id === userId);
  const [messages, setMessages] = useState<MockMessage[]>(MOCK_MESSAGES[userId || ''] || []);
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: false }), 100);
  }, []);

  const send = () => {
    if (!text.trim()) return;
    const msg: MockMessage = { id: `m_${Date.now()}`, sender_id: 'me', recipient_id: userId || '', text: text.trim(), read: true, created_at: new Date().toISOString() };
    setMessages(prev => [...prev, msg]);
    setText('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }: { item: MockMessage }) => {
    const isMe = item.sender_id === 'me';
    return (
      <View testID={`msg-${item.id}`} style={[styles.msgRow, isMe && styles.msgRowRight]}>
        <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
          <Text style={[styles.msgText, isMe && styles.myText]}>{item.text}</Text>
        </View>
        <Text style={styles.msgTime}>{formatDistanceToNow(new Date(item.created_at), { addSuffix: false })}</Text>
      </View>
    );
  };

  if (!conv) {
    return <View style={[styles.container, { paddingTop: insets.top }]}><Text style={{ padding: 20 }}>Conversation not found</Text></View>;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity testID="back-chat-btn" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <View style={styles.headerUser}>
          <Image source={{ uri: conv.profile_picture }} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerName}>{conv.username}</Text>
            <Text style={styles.headerStatus}>{conv.is_online ? 'Active now' : 'Offline'}</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity><Ionicons name="call-outline" size={22} color="#2C3E50" /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="videocam-outline" size={24} color="#2C3E50" /></TouchableOpacity>
        </View>
      </View>

      <FlatList ref={listRef} data={messages} renderItem={renderMessage} keyExtractor={item => item.id} contentContainerStyle={styles.messagesList} showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyText}>Say hello!</Text></View>}
      />

      <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        <TouchableOpacity style={styles.inputIcon}><Ionicons name="camera-outline" size={24} color="#4A90E2" /></TouchableOpacity>
        <TextInput testID="chat-input" style={styles.input} placeholder="Message..." value={text} onChangeText={setText} placeholderTextColor="#95A5A6" />
        {text.trim() ? (
          <TouchableOpacity testID="send-btn" onPress={send}><Ionicons name="send" size={22} color="#4A90E2" /></TouchableOpacity>
        ) : (
          <View style={styles.inputActions}>
            <TouchableOpacity><Ionicons name="mic-outline" size={24} color="#4A90E2" /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="image-outline" size={24} color="#4A90E2" /></TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', gap: 8 },
  headerUser: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 4 },
  headerAvatar: { width: 36, height: 36, borderRadius: 18 },
  headerName: { fontSize: 16, fontWeight: '600', color: '#2C3E50' },
  headerStatus: { fontSize: 12, color: '#27AE60' },
  headerActions: { flexDirection: 'row', gap: 16 },
  messagesList: { padding: 16, paddingBottom: 8 },
  msgRow: { marginBottom: 12, alignItems: 'flex-start' },
  msgRowRight: { alignItems: 'flex-end' },
  bubble: { maxWidth: '78%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20 },
  myBubble: { backgroundColor: '#4A90E2', borderBottomRightRadius: 4 },
  theirBubble: { backgroundColor: '#F0F1F3', borderBottomLeftRadius: 4 },
  msgText: { fontSize: 15, color: '#2C3E50', lineHeight: 20 },
  myText: { color: '#FFF' },
  msgTime: { fontSize: 11, color: '#95A5A6', marginTop: 4, marginHorizontal: 4 },
  empty: { padding: 60, alignItems: 'center' },
  emptyText: { color: '#95A5A6', fontSize: 16 },
  inputBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F0F0F0', backgroundColor: '#FFF', gap: 8 },
  inputIcon: { padding: 4 },
  input: { flex: 1, backgroundColor: '#F5F6F7', borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, color: '#2C3E50' },
  inputActions: { flexDirection: 'row', gap: 12 },
});
