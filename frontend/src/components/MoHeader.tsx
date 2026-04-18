import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MoText from './MoText';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface MoHeaderProps {
  title: string;
  back?: boolean;
  right?: React.ReactNode;
  large?: boolean;
}

export default function MoHeader({ title, back = true, right, large }: MoHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.header, { paddingTop: insets.top + spacing.sm }]}>
      <View style={s.row}>
        {back ? <TouchableOpacity testID="header-back" onPress={() => router.back()} style={s.backBtn}><Ionicons name="arrow-back" size={24} color={colors.text.primary} /></TouchableOpacity> : <View style={{ width: 40 }} />}
        {!large && <MoText variant="h3" style={s.title}>{title}</MoText>}
        <View style={s.rightWrap}>{right || <View style={{ width: 40 }} />}</View>
      </View>
      {large && <MoText variant="h2" style={s.largeTitle}>{title}</MoText>}
    </View>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: colors.bg.primary, paddingHorizontal: spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border.subtle },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { width: 40 },
  title: { flex: 1, textAlign: 'center' },
  rightWrap: { width: 40, alignItems: 'flex-end' },
  largeTitle: { marginTop: spacing.sm },
});
