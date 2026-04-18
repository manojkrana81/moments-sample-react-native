import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface MoDividerProps { gap?: number; }

export default function MoDivider({ gap = spacing.md }: MoDividerProps) {
  return <View style={[s.line, { marginVertical: gap }]} />;
}

const s = StyleSheet.create({ line: { height: 1, backgroundColor: colors.border.subtle } });
