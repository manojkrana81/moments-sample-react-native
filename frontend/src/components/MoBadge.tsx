import React from 'react';
import { View, StyleSheet } from 'react-native';
import MoText from './MoText';
import { colors } from '../theme/colors';

interface MoBadgeProps { count: number; }

export default function MoBadge({ count }: MoBadgeProps) {
  if (count <= 0) return null;
  return (
    <View style={s.badge}>
      <MoText variant="tiny" color="inverse" style={s.txt}>{count > 99 ? '99+' : count}</MoText>
    </View>
  );
}

const s = StyleSheet.create({
  badge: { backgroundColor: colors.brand.primary, borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 },
  txt: { fontWeight: '700' },
});
