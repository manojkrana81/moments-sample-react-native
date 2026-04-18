import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import MoText from './MoText';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/spacing';
import { Ionicons } from '@expo/vector-icons';

interface MoInputProps extends TextInputProps {
  label?: string;
  icon?: string;
  error?: string;
}

export default function MoInput({ label, icon, error, style, ...props }: MoInputProps) {
  return (
    <View style={s.wrap}>
      {label && <MoText variant="label" color="muted" style={s.label}>{label}</MoText>}
      <View style={[s.row, error && s.errorBorder]}>
        {icon && <Ionicons name={icon as any} size={20} color={colors.text.muted} style={s.icon} />}
        <TextInput style={[s.input, style]} placeholderTextColor={colors.text.muted} {...props} />
      </View>
      {error && <MoText variant="tiny" color="danger" style={s.err}>{error}</MoText>}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginBottom: spacing.sm },
  label: { marginBottom: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg.secondary, borderRadius: radii.sm, borderWidth: 1, borderColor: colors.border.default, paddingHorizontal: spacing.md },
  icon: { marginRight: spacing.sm },
  input: { flex: 1, paddingVertical: 14, fontSize: 15, color: colors.text.primary },
  errorBorder: { borderColor: colors.fn.danger },
  err: { marginTop: spacing.xs },
});
