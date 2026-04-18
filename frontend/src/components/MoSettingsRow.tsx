import React from 'react';
import { View, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import MoText from './MoText';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

// Toggle row for settings
interface MoToggleProps { label: string; sub?: string; value: boolean; onToggle: () => void; }

export function MoToggle({ label, sub, value, onToggle }: MoToggleProps) {
  return (
    <View style={s.row}>
      <View style={s.info}><MoText variant="body">{label}</MoText>{sub && <MoText variant="caption" color="muted">{sub}</MoText>}</View>
      <Switch value={value} onValueChange={onToggle} trackColor={{ false: colors.border.default, true: colors.brand.primary }} thumbColor="#FFF" />
    </View>
  );
}

// Navigation row for settings
interface MoNavRowProps { icon: string; label: string; onPress?: () => void; danger?: boolean; }

export function MoNavRow({ icon, label, onPress, danger }: MoNavRowProps) {
  return (
    <TouchableOpacity testID={`nav-${label.toLowerCase().replace(/\s/g, '-')}`} style={s.navRow} onPress={onPress}>
      <Ionicons name={icon as any} size={22} color={danger ? colors.fn.danger : colors.brand.primary} />
      <MoText variant="body" style={{ flex: 1, marginLeft: spacing.sm }} color={danger ? 'danger' : 'primary'}>{label}</MoText>
      <Ionicons name="chevron-forward" size={18} color={colors.text.muted} />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: 14 },
  info: { flex: 1 },
  navRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: 15, gap: spacing.sm },
});
