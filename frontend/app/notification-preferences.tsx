import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../src/theme/colors';

const Toggle = ({ label, sub, value, onToggle }: { label: string; sub: string; value: boolean; onToggle: () => void }) => (
  <View style={s.toggleRow}><View style={s.toggleInfo}><Text style={s.toggleLabel}>{label}</Text><Text style={s.toggleSub}>{sub}</Text></View><Switch value={value} onValueChange={onToggle} trackColor={{ false: C.border, true: C.navy }} thumbColor="#FFF" /></View>
);

export default function NotificationPreferences() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [likes, setLikes] = useState(true);
  const [comments, setComments] = useState(true);
  const [follows, setFollows] = useState(true);
  const [messages, setMessages] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [stories, setStories] = useState(false);
  const [reels, setReels] = useState(false);

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <View style={s.header}><TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color={C.text} /></TouchableOpacity><Text style={s.title}>Notifications</Text><View style={{ width: 24 }} /></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={s.section}>Push Notifications</Text>
        <Toggle label="Likes" sub="When someone likes your post" value={likes} onToggle={() => setLikes(!likes)} />
        <Toggle label="Comments" sub="When someone comments on your post" value={comments} onToggle={() => setComments(!comments)} />
        <Toggle label="New Followers" sub="When someone follows you" value={follows} onToggle={() => setFollows(!follows)} />
        <Toggle label="Messages" sub="When you receive a new message" value={messages} onToggle={() => setMessages(!messages)} />
        <Toggle label="Mentions" sub="When someone mentions you" value={mentions} onToggle={() => setMentions(!mentions)} />
        <Text style={s.section}>Content</Text>
        <Toggle label="Story Replies" sub="Replies to your stories" value={stories} onToggle={() => setStories(!stories)} />
        <Toggle label="Reels Activity" sub="Likes and comments on your reels" value={reels} onToggle={() => setReels(!reels)} />
        <View style={s.note}><Ionicons name="information-circle-outline" size={16} color={C.textDim} /><Text style={s.noteText}>You can also manage notifications in your device settings</Text></View>
      </ScrollView>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  title: { fontSize: 18, fontWeight: '600', color: C.text },
  section: { fontSize: 13, fontWeight: '600', color: C.textMuted, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  toggleInfo: { flex: 1 },
  toggleLabel: { fontSize: 16, color: C.text },
  toggleSub: { fontSize: 13, color: C.textMuted, marginTop: 2 },
  note: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 16, marginTop: 8 },
  noteText: { fontSize: 13, color: C.textDim, flex: 1 },
});
