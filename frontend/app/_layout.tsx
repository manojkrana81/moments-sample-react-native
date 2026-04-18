import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../src/contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: '#FFFFFF' } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="comments" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="chat" />
        <Stack.Screen name="user-profile" />
        <Stack.Screen name="followers" />
        <Stack.Screen name="edit-profile" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="settings" />
        <Stack.Screen name="add-post" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="saved-collections" />
        <Stack.Screen name="activity-log" />
        <Stack.Screen name="close-friends" />
        <Stack.Screen name="archive" />
        <Stack.Screen name="story-highlights" />
        <Stack.Screen name="insights" />
        <Stack.Screen name="qr-profile" />
        <Stack.Screen name="change-password" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="user-activity" />
        <Stack.Screen name="blocked-users" />
        <Stack.Screen name="privacy-settings" />
        <Stack.Screen name="notification-preferences" />
      </Stack>
    </AuthProvider>
  );
}
