import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radii } from '../theme/spacing';

interface MoCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

// Flat card - 1px border, no shadow, sharp edges (editorial)
export default function MoCard({ children, style }: MoCardProps) {
  return <View style={[s.card, style]}>{children}</View>;
}

const s = StyleSheet.create({
  card: { backgroundColor: colors.bg.primary, borderWidth: 1, borderColor: colors.border.default, borderRadius: radii.sm, padding: spacing.md },
});
