import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import MoText from './MoText';
import { colors } from '../theme/colors';
import { radii } from '../theme/spacing';

// Squircle avatars - NOT circular (unique design)
interface MoAvatarProps {
  uri?: string | null;
  name?: string;
  size?: number;
  ring?: boolean;
  online?: boolean;
  style?: ViewStyle;
}

export default function MoAvatar({ uri, name, size = 44, ring, online, style }: MoAvatarProps) {
  const r = size * 0.2; // squircle radius
  return (
    <View style={[{ width: size, height: size, position: 'relative' }, ring && { borderWidth: 2, borderColor: colors.brand.primary, borderRadius: r + 2, padding: 2 }, style]}>
      {uri ? (
        <Image source={{ uri }} style={{ width: ring ? size - 8 : size, height: ring ? size - 8 : size, borderRadius: r, backgroundColor: colors.bg.tertiary }} />
      ) : (
        <View style={{ width: ring ? size - 8 : size, height: ring ? size - 8 : size, borderRadius: r, backgroundColor: colors.brand.light, justifyContent: 'center', alignItems: 'center' }}>
          <MoText variant="bodyBold" color="brand">{name?.charAt(0).toUpperCase() || '?'}</MoText>
        </View>
      )}
      {online && <View style={[s.dot, { right: ring ? 0 : -1, bottom: ring ? 0 : -1 }]} />}
    </View>
  );
}

const s = StyleSheet.create({
  dot: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: colors.fn.success, borderWidth: 2, borderColor: colors.bg.primary },
});
