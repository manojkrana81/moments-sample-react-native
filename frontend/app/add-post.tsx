import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: W } = Dimensions.get('window');

export default function AddPostScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission Required', 'Please allow access to your photos'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8, base64: true });
    if (!result.canceled && result.assets[0]) {
      const a = result.assets[0];
      setImage(a.base64 ? `data:image/jpeg;base64,${a.base64}` : a.uri);
    }
  };

  const handlePost = () => {
    if (!image) { Alert.alert('Error', 'Please select an image'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); Alert.alert('Success', 'Your moment has been shared!'); setImage(null); setCaption(''); setLocation(''); router.back(); }, 1000);
  };

  const handleStory = () => {
    if (!image) { Alert.alert('Error', 'Please select an image'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); Alert.alert('Success', 'Story created! Visible for 24 hours.'); setImage(null); setCaption(''); setLocation(''); router.back(); }, 1000);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity testID="close-add-btn" onPress={() => router.back()}><Ionicons name="close" size={28} color="#FFFFFF" /></TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity testID="share-btn" onPress={handlePost} disabled={loading || !image}>
          <Text style={[styles.shareText, (!image || loading) && styles.shareDisabled]}>Share</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {!image ? (
          <TouchableOpacity testID="pick-image-btn" style={styles.picker} onPress={pickImage}>
            <Ionicons name="camera" size={48} color="#D4AF37" />
            <Text style={styles.pickerTitle}>Select a photo</Text>
            <Text style={styles.pickerSub}>Share your best moments</Text>
          </TouchableOpacity>
        ) : (
          <View><Image source={{ uri: image }} style={styles.selectedImg} />
            <TouchableOpacity testID="change-img-btn" style={styles.changeBtn} onPress={pickImage}>
              <Ionicons name="refresh" size={16} color="#D4AF37" /><Text style={styles.changeTxt}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.form}>
          <TextInput testID="caption-input" style={styles.captionInput} placeholder="Write a caption..." value={caption} onChangeText={setCaption} multiline maxLength={500} placeholderTextColor="#3D5278" />
          <View style={styles.inputRow}><Ionicons name="location-outline" size={20} color="#6B82A6" /><TextInput testID="location-input" style={styles.rowInput} placeholder="Add location" value={location} onChangeText={setLocation} placeholderTextColor="#3D5278" /></View>
          <TouchableOpacity testID="post-btn" style={[styles.btn, (!image || loading) && styles.btnDisabled]} onPress={handlePost} disabled={loading || !image}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Share Post</Text>}
          </TouchableOpacity>
          {image && <TouchableOpacity testID="story-btn" style={[styles.btn, styles.storyBtn]} onPress={handleStory} disabled={loading}>
            <Ionicons name="time-outline" size={18} color="#D4AF37" /><Text style={styles.storyText}>Share as Story (24h)</Text>
          </TouchableOpacity>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1628' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  shareText: { fontSize: 16, fontWeight: '700', color: '#D4AF37' },
  shareDisabled: { color: '#3D5278' },
  content: { padding: 16 },
  picker: { width: W - 32, height: W - 32, backgroundColor: '#F8F9FA', borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#E8ECF0', borderStyle: 'dashed' },
  pickerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', marginTop: 12 },
  pickerSub: { fontSize: 14, color: '#3D5278', marginTop: 4 },
  selectedImg: { width: W - 32, height: W - 32, borderRadius: 12 },
  changeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12, gap: 6 },
  changeTxt: { color: '#D4AF37', fontSize: 15, fontWeight: '600' },
  form: { marginTop: 20 },
  captionInput: { backgroundColor: '#F8F9FA', borderRadius: 12, padding: 16, fontSize: 15, minHeight: 80, textAlignVertical: 'top', marginBottom: 12, color: '#FFFFFF' },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 12, paddingHorizontal: 16, marginBottom: 20 },
  rowInput: { flex: 1, fontSize: 15, paddingVertical: 14, marginLeft: 8, color: '#FFFFFF' },
  btn: { backgroundColor: '#D4AF37', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 12, flexDirection: 'row', justifyContent: 'center', gap: 8 },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#0A1628', fontSize: 16, fontWeight: '600' },
  storyBtn: { backgroundColor: '#0A1628', borderWidth: 2, borderColor: '#D4AF37' },
  storyText: { color: '#D4AF37', fontSize: 16, fontWeight: '600' },
});
