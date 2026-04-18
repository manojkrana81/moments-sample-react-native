import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_NOTIFICATIONS, MockNotification } from '../src/data/mockData';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return { name: 'heart' as const, color: '#FF3B30' };
      case 'comment': return { name: 'chatbubble' as const, color: '#D4AF37' };
      case 'follow': return { name: 'person-add' as const, color: '#2ED573' };
      case 'mention': return { name: 'at' as const, color: '#8E44AD' };
      default: return { name: 'notifications' as const, color: '#666' };
    }
  };

  const renderNotification = ({ item }: { item: MockNotification }) => {
    const icon = getIcon(item.type);
    return (
      <TouchableOpacity testID={`notif-${item.id}`} style={[styles.notifItem, !item.is_read && styles.unread]}>
        <Image source={{ uri: item.profile_picture }} style={styles.avatar} />
        <View style={styles.notifContent}>
          <Text style={styles.notifText}>
            <Text style={styles.notifUsername}>{item.username}</Text> {item.text}
          </Text>
          <Text style={styles.notifTime}>{formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</Text>
        </View>
        {item.post_image ? (
          <Image source={{ uri: item.post_image }} style={styles.postThumb} />
        ) : item.type === 'follow' ? (
          <TouchableOpacity style={styles.followBtn}><Text style={styles.followBtnText}>Follow</Text></TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity testID="back-notif-btn" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1628' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  notifItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  unread: { backgroundColor: '#F0F7FF' },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  notifContent: { flex: 1 },
  notifText: { fontSize: 14, color: '#FFFFFF', lineHeight: 18 },
  notifUsername: { fontWeight: '700' },
  notifTime: { fontSize: 12, color: '#3D5278', marginTop: 2 },
  postThumb: { width: 44, height: 44, borderRadius: 4 },
  followBtn: { backgroundColor: '#D4AF37', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 6 },
  followBtnText: { color: '#0A1628', fontSize: 13, fontWeight: '600' },
});
