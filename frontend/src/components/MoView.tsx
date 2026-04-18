import React from 'react';
import { View, ViewProps } from 'react-native';
import { colors } from '../theme/colors';

type BgType = 'primary' | 'secondary' | 'tertiary';

interface MoViewProps extends ViewProps {
  bg?: BgType;
  flex?: boolean;
}

const bgMap: Record<BgType, string> = {
  primary: colors.bg.primary,
  secondary: colors.bg.secondary,
  tertiary: colors.bg.tertiary,
};

export default function MoView({ bg = 'primary', flex, style, ...props }: MoViewProps) {
  return <View style={[{ backgroundColor: bgMap[bg] }, flex && { flex: 1 }, style]} {...props} />;
}
