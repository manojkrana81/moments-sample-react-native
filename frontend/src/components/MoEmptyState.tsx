import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MoText from './MoText';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface MoEmptyStateProps { icon: string; title: string; subtitle?: string; }

export default function MoEmptyState({ icon, title, subtitle }: MoEmptyStateProps) {
  return (
    <View style={s.wrap}>
      <Ionicons name={icon as any} size={56} color={colors.border.strong} />
      <MoText variant="h3" color="muted" style={s.title}>{title}</MoText>
      {subtitle && <MoText variant="caption" color="muted">{subtitle}</MoText>}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: spacing.xxl },
  title: { marginTop: spacing.md, marginBottom: spacing.xs },
});
