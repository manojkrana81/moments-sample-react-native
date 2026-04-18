import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MoText from './MoText';
import { colors } from '../theme/colors';
import { spacing, radii } from '../theme/spacing';

export interface ActionItem { icon: string; label: string; onPress: () => void; danger?: boolean; }

interface Props { visible: boolean; onClose: () => void; title?: string; actions: ActionItem[]; }

export default function MoActionSheet({ visible, onClose, title, actions }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.overlay} onPress={onClose}>
        <View style={s.sheet}>
          <View style={s.handle} />
          {title && <MoText variant="label" color="muted" style={s.title}>{title}</MoText>}
          {actions.map((a, i) => (
            <TouchableOpacity key={i} testID={`action-${a.label.toLowerCase().replace(/\s/g, '-')}`} style={s.item} onPress={() => { a.onPress(); onClose(); }}>
              <Ionicons name={a.icon as any} size={22} color={a.danger ? colors.fn.danger : colors.brand.primary} />
              <MoText variant="body" color={a.danger ? 'danger' : 'primary'}>{a.label}</MoText>
            </TouchableOpacity>
          ))}
          <TouchableOpacity testID="action-cancel" style={s.cancel} onPress={onClose}><MoText variant="bodyBold" color="muted">Cancel</MoText></TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.bg.primary, borderTopLeftRadius: radii.lg, borderTopRightRadius: radii.lg, paddingBottom: 34, paddingTop: spacing.sm },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border.default, alignSelf: 'center', marginBottom: spacing.sm },
  title: { textAlign: 'center', paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border.subtle, marginHorizontal: spacing.md },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: spacing.lg, gap: 14 },
  cancel: { marginTop: spacing.xs, paddingVertical: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border.subtle, marginHorizontal: spacing.md },
});
