import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../theme/colors';

export interface ActionItem {
  icon: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  actions: ActionItem[];
}

export default function ActionSheet({ visible, onClose, title, actions }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.overlay} onPress={onClose}>
        <View style={s.sheet}>
          {title && <Text style={s.title}>{title}</Text>}
          <View style={s.handle} />
          {actions.map((a, i) => (
            <TouchableOpacity key={i} testID={`action-${a.label.toLowerCase().replace(/\s/g, '-')}`} style={s.item} onPress={() => { a.onPress(); onClose(); }}>
              <Ionicons name={a.icon as any} size={22} color={a.danger ? C.danger : C.navy} />
              <Text style={[s.label, a.danger && s.dangerLabel]}>{a.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity testID="action-cancel" style={s.cancelBtn} onPress={onClose}>
            <Text style={s.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: C.bg, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 34, paddingTop: 8 },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: C.border, alignSelf: 'center', marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600', color: C.text, textAlign: 'center', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: C.border, marginHorizontal: 16 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, gap: 14 },
  label: { fontSize: 16, color: C.text },
  dangerLabel: { color: C.danger },
  cancelBtn: { marginTop: 4, paddingVertical: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: C.border, marginHorizontal: 16 },
  cancelText: { fontSize: 16, fontWeight: '600', color: C.textMuted },
});
