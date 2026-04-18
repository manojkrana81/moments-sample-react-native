import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../../src/theme/colors';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: C.gold,
      tabBarInactiveTintColor: C.textMuted,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: C.surface,
        borderTopColor: C.goldBorder,
        borderTopWidth: 1,
        height: 52 + insets.bottom,
        paddingBottom: insets.bottom,
        paddingTop: 6,
        elevation: 0,
      },
    }}>
      <Tabs.Screen name="home" options={{ tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} /> }} />
      <Tabs.Screen name="search" options={{ tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} /> }} />
      <Tabs.Screen name="reels" options={{ tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'play-circle' : 'play-circle-outline'} size={28} color={color} /> }} />
      <Tabs.Screen name="messages" options={{ tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} size={24} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={26} color={color} /> }} />
    </Tabs>
  );
}
