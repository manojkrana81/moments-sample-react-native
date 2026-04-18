// Mo Design System - Typography
import { TextStyle } from 'react-native';

export const typo: Record<string, TextStyle> = {
  h1: { fontSize: 36, fontWeight: '800', letterSpacing: -1 },
  h2: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  h3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  bodyBold: { fontSize: 15, fontWeight: '600', lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
  small: { fontSize: 12, fontWeight: '500', letterSpacing: 0.5, textTransform: 'uppercase' },
  label: { fontSize: 13, fontWeight: '600' },
  tiny: { fontSize: 11, fontWeight: '400' },
};
