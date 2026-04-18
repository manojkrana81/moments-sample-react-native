import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/spacing';

interface MoSearchBarProps {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}

export default function MoSearchBar({ value, onChangeText, placeholder = 'Search...' }: MoSearchBarProps) {
  return (
    <View style={s.box}>
      <Ionicons name="search" size={18} color={colors.text.muted} />
      <TextInput testID="search-input" style={s.input} placeholder={placeholder} value={value} onChangeText={onChangeText} autoCapitalize="none" placeholderTextColor={colors.text.muted} />
      {value.length > 0 && <TouchableOpacity onPress={() => onChangeText('')}><Ionicons name="close-circle" size={18} color={colors.text.muted} /></TouchableOpacity>}
    </View>
  );
}

const s = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg.tertiary, borderRadius: radii.sm, paddingHorizontal: spacing.sm + 4, height: 40, gap: spacing.sm, borderWidth: 1, borderColor: colors.border.default },
  input: { flex: 1, fontSize: 15, color: colors.text.primary },
});
