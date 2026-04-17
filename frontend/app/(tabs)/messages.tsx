import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, MockConversation, MockMessage } from '../../src/data/mockData';
import { formatDistanceToNow } from 'date-fns';

export default function MessagesScreen() {
  const [conversations, setConversations] = useState<MockConversation[]>(MOCK_CONVERSATIONS);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<MockMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const openChat = (userId: string) => {
    setActiveChat(userId);
    setChatMessages(MOCK_MESSAGES[userId] || []);
    // Mark as read
    setConversations(prev =>
      prev.map(c => (c.user_id === userId ? { ...c, unread_count: 0 } : c))
    );
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    const msg: MockMessage = {
      id: `m${Date.now()}`,
      sender_id: 'me',
      recipient_id: activeChat,
      text: newMessage.trim(),
      read: true,
      created_at: new Date().toISOString(),
    };
    setChatMessages(prev => [...prev, msg]);
    setConversations(prev =>
      prev.map(c =>
        c.user_id === activeChat
          ? { ...c, last_message: msg.text, last_message_time: msg.created_at }
          : c
      )
    );
    setNewMessage('');
  };

  const activeChatUser = conversations.find(c => c.user_id === activeChat);

  // Chat Detail View
  if (activeChat && activeChatUser) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.chatHeader}>
          <TouchableOpacity testID="back-chat-btn" onPress={() => setActiveChat(null)}>
            <Ionicons name="arrow-back" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Image source={{ uri: activeChatUser.profile_picture }} style={styles.chatAvatar} />
          <Text style={styles.chatUsername}>{activeChatUser.username}</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity testID="chat-info-btn">
            <Ionicons name="information-circle-outline" size={24} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={chatMessages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              testID={`msg-${item.id}`}
              style={[styles.messageBubble, item.sender_id === 'me' ? styles.myMessage : styles.theirMessage]}
            >
              <Text style={[styles.messageText, item.sender_id === 'me' && styles.myMessageText]}>
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={styles.inputBar}>
          <TextInput
            testID="message-input"
            style={styles.messageInput}
            placeholder="Message..."
            value={newMessage}
            onChangeText={setNewMessage}
            placeholderTextColor="#95A5A6"
          />
          <TouchableOpacity testID="send-message-btn" onPress={sendMessage} disabled={!newMessage.trim()}>
            <Ionicons name="send" size={24} color={newMessage.trim() ? '#4A90E2' : '#BDC3C7'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // Conversations List
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity testID="new-message-btn">
          <Ionicons name="create-outline" size={24} color="#2C3E50" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={item => item.user_id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={56} color="#D0D0D0" />
            <Text style={styles.emptyText}>No messages yet</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            testID={`conv-${item.user_id}`}
            style={styles.convItem}
            onPress={() => openChat(item.user_id)}
          >
            <Image source={{ uri: item.profile_picture }} style={styles.avatar} />
            <View style={styles.convDetails}>
              <View style={styles.convTop}>
                <Text style={[styles.convUsername, item.unread_count > 0 && styles.unreadName]}>
                  {item.username}
                </Text>
                <Text style={styles.convTime}>
                  {formatDistanceToNow(new Date(item.last_message_time), { addSuffix: false })}
                </Text>
              </View>
              <View style={styles.convBottom}>
                <Text
                  style={[styles.convMessage, item.unread_count > 0 && styles.unreadMsg]}
                  numberOfLines={1}
                >
                  {item.last_message}
                </Text>
                {item.unread_count > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{item.unread_count}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 48, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#2C3E50' },
  convItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  avatar: { width: 52, height: 52, borderRadius: 26, marginRight: 12, backgroundColor: '#F0F0F0' },
  convDetails: { flex: 1 },
  convTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  convUsername: { fontSize: 15, fontWeight: '500', color: '#2C3E50' },
  unreadName: { fontWeight: '700' },
  convTime: { fontSize: 12, color: '#95A5A6' },
  convBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  convMessage: { fontSize: 14, color: '#7F8C8D', flex: 1 },
  unreadMsg: { fontWeight: '600', color: '#2C3E50' },
  unreadBadge: {
    backgroundColor: '#4A90E2', borderRadius: 10, minWidth: 20, height: 20,
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6, marginLeft: 8,
  },
  unreadCount: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyText: { fontSize: 16, color: '#95A5A6', marginTop: 12 },
  // Chat styles
  chatHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingTop: 48, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  chatAvatar: { width: 32, height: 32, borderRadius: 16 },
  chatUsername: { fontSize: 16, fontWeight: '600', color: '#2C3E50' },
  chatContent: { padding: 16, paddingBottom: 8 },
  messageBubble: { maxWidth: '75%', padding: 12, borderRadius: 18, marginBottom: 8 },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#4A90E2', borderBottomRightRadius: 4 },
  theirMessage: { alignSelf: 'flex-start', backgroundColor: '#F0F1F3', borderBottomLeftRadius: 4 },
  messageText: { fontSize: 15, color: '#2C3E50', lineHeight: 20 },
  myMessageText: { color: '#FFF' },
  inputBar: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10,
    borderTopWidth: 1, borderTopColor: '#F0F0F0', backgroundColor: '#FFF',
  },
  messageInput: {
    flex: 1, backgroundColor: '#F5F6F7', borderRadius: 20, paddingHorizontal: 16,
    paddingVertical: 10, fontSize: 15, marginRight: 10, color: '#2C3E50',
  },
});
