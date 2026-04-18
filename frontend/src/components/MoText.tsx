import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typo } from '../theme/typography';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'caption' | 'small' | 'label' | 'tiny';
type Color = 'primary' | 'secondary' | 'muted' | 'inverse' | 'brand' | 'danger';

interface MoTextProps extends TextProps {
  variant?: Variant;
  color?: Color;
}

const colorMap: Record<Color, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  muted: colors.text.muted,
  inverse: colors.text.inverse,
  brand: colors.brand.primary,
  danger: colors.fn.danger,
};

export default function MoText({ variant = 'body', color = 'primary', style, ...props }: MoTextProps) {
  return <Text style={[typo[variant] as TextStyle, { color: colorMap[color] }, style]} {...props} />;
}
