import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, TextInput,
  ScrollView, Alert, KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AddPostScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setImage(asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : asset.uri);
    }
  };

  const handlePost = () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your moment has been shared!');
      setImage(null);
      setCaption('');
      setLocation('');
      router.push('/(tabs)/home');
    }, 1000);
  };

  const handleCreateStory = () => {
    if (!image) {
      Alert.alert('Error', 'Please select an image');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Story created! Visible for 24 hours.');
      setImage(null);
      setCaption('');
      setLocation('');
      router.push('/(tabs)/home');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity testID="close-add-post-btn" onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity
          testID="share-post-btn"
          onPress={handlePost}
          disabled={loading || !image}
        >
          <Text style={[styles.shareText, (!image || loading) && styles.shareTextDisabled]}>
            Share
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {!image ? (
          <TouchableOpacity testID="pick-image-btn" style={styles.imagePicker} onPress={pickImage}>
            <View style={styles.imagePickerInner}>
              <Ionicons name="camera" size={48} color="#4A90E2" />
              <Text style={styles.imagePickerTitle}>Select a photo</Text>
              <Text style={styles.imagePickerSub}>Share your best moments</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View>
            <Image source={{ uri: image }} style={styles.selectedImage} />
            <TouchableOpacity testID="change-image-btn" style={styles.changeBtn} onPress={pickImage}>
              <Ionicons name="refresh" size={16} color="#4A90E2" />
              <Text style={styles.changeBtnText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.form}>
          <TextInput
            testID="caption-input"
            style={styles.captionInput}
            placeholder="Write a caption..."
            value={caption}
            onChangeText={setCaption}
            multiline
            maxLength={500}
            placeholderTextColor="#95A5A6"
          />

          <View style={styles.inputRow}>
            <Ionicons name="location-outline" size={20} color="#7F8C8D" />
            <TextInput
              testID="location-input"
              style={styles.rowInput}
              placeholder="Add location"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#95A5A6"
            />
          </View>

          <TouchableOpacity
            testID="post-btn"
            style={[styles.button, (!image || loading) && styles.buttonDisabled]}
            onPress={handlePost}
            disabled={loading || !image}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Share Post</Text>
            )}
          </TouchableOpacity>

          {image && (
            <TouchableOpacity
              testID="story-btn"
              style={[styles.button, styles.storyButton, loading && styles.buttonDisabled]}
              onPress={handleCreateStory}
              disabled={loading}
            >
              <Ionicons name="time-outline" size={18} color="#4A90E2" />
              <Text style={styles.storyButtonText}>Share as Story (24h)</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 48, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#2C3E50' },
  shareText: { fontSize: 16, fontWeight: '600', color: '#4A90E2' },
  shareTextDisabled: { color: '#BDC3C7' },
  content: { padding: 16 },
  imagePicker: {
    width: SCREEN_WIDTH - 32, height: SCREEN_WIDTH - 32,
    backgroundColor: '#F8F9FA', borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#E8ECF0', borderStyle: 'dashed',
  },
  imagePickerInner: { alignItems: 'center' },
  imagePickerTitle: { fontSize: 18, fontWeight: '600', color: '#2C3E50', marginTop: 12 },
  imagePickerSub: { fontSize: 14, color: '#95A5A6', marginTop: 4 },
  selectedImage: {
    width: SCREEN_WIDTH - 32, height: SCREEN_WIDTH - 32,
    borderRadius: 12, backgroundColor: '#F5F5F5',
  },
  changeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 12, gap: 6,
  },
  changeBtnText: { color: '#4A90E2', fontSize: 15, fontWeight: '600' },
  form: { marginTop: 20 },
  captionInput: {
    backgroundColor: '#F8F9FA', borderRadius: 12, padding: 16,
    fontSize: 15, minHeight: 80, textAlignVertical: 'top', marginBottom: 12, color: '#2C3E50',
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA',
    borderRadius: 12, paddingHorizontal: 16, marginBottom: 20,
  },
  rowInput: { flex: 1, fontSize: 15, paddingVertical: 14, marginLeft: 8, color: '#2C3E50' },
  button: {
    backgroundColor: '#4A90E2', borderRadius: 12, padding: 16,
    alignItems: 'center', marginBottom: 12, flexDirection: 'row', justifyContent: 'center', gap: 8,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  storyButton: { backgroundColor: '#FFF', borderWidth: 2, borderColor: '#4A90E2' },
  storyButtonText: { color: '#4A90E2', fontSize: 16, fontWeight: '600' },
});
