// Mo Design System - Colors
export const colors = {
  bg: { primary: '#FFFFFF', secondary: '#FAFAFA', tertiary: '#F3F4F6' },
  brand: { primary: '#3366A0', light: '#EBF0F6', accent: '#1D4ED8' },
  text: { primary: '#0A0A0A', secondary: '#525252', muted: '#A3A3A3', inverse: '#FFFFFF' },
  border: { subtle: '#F5F5F5', default: '#E5E5E5', strong: '#D4D4D4' },
  fn: { danger: '#EF4444', success: '#10B981', warning: '#F59E0B', info: '#3B82F6' },
};

// Backward-compatible flat alias for existing screens
export const C = {
  bg: colors.bg.primary,
  surface: colors.bg.secondary,
  card: colors.bg.tertiary,
  elevated: colors.bg.tertiary,
  navy: colors.brand.primary,
  navyLight: colors.brand.accent,
  accent: colors.brand.accent,
  text: colors.text.primary,
  textSoft: colors.text.secondary,
  textMuted: colors.text.muted,
  textDim: '#B0B8C4',
  danger: colors.fn.danger,
  success: colors.fn.success,
  info: colors.fn.info,
  warning: colors.fn.warning,
  online: colors.fn.success,
  border: colors.border.default,
  borderLight: colors.border.subtle,
  goldBorder: colors.border.default,
  goldGlow: colors.brand.light,
  gold: colors.brand.primary,
  overlay: 'rgba(0,0,0,0.5)',
};
