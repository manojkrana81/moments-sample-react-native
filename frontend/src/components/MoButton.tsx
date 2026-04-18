import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import MoText from './MoText';
import { colors } from '../theme/colors';
import { radii, spacing } from '../theme/spacing';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';

interface MoButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
  size?: 'sm' | 'md' | 'lg';
}

export default function MoButton({ title, onPress, variant = 'primary', loading, disabled, testID, icon, style, size = 'md' }: MoButtonProps) {
  const s = styles[variant];
  const h = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  return (
    <TouchableOpacity testID={testID} style={[base.btn, { height: h }, s.btn, (disabled || loading) && base.off, style]} onPress={onPress} disabled={disabled || loading}>
      {loading ? <ActivityIndicator color={s.txt} /> : (
        <>
          {icon}
          <MoText variant={size === 'sm' ? 'label' : 'bodyBold'} style={{ color: s.txt }}>{title}</MoText>
        </>
      )}
    </TouchableOpacity>
  );
}

const base = StyleSheet.create({
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: spacing.md, borderRadius: radii.sm },
  off: { opacity: 0.5 },
});

const styles: Record<Variant, { btn: ViewStyle; txt: string }> = {
  primary: { btn: { backgroundColor: colors.brand.primary }, txt: colors.text.inverse },
  secondary: { btn: { backgroundColor: colors.bg.tertiary }, txt: colors.text.primary },
  outline: { btn: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border.default }, txt: colors.text.primary },
  danger: { btn: { backgroundColor: colors.fn.danger }, txt: colors.text.inverse },
  ghost: { btn: { backgroundColor: 'transparent' }, txt: colors.brand.primary },
};
