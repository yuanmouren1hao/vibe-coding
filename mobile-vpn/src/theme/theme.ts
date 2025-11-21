import {MD3DarkTheme} from 'react-native-paper';
import {colors} from './colors';

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary.main,
    primaryContainer: colors.primary.dark,
    secondary: colors.accent.main,
    secondaryContainer: colors.accent.dark,
    background: colors.background.primary,
    surface: colors.background.card,
    surfaceVariant: colors.background.secondary,
    error: colors.status.error,
    onPrimary: colors.text.primary,
    onSecondary: colors.text.primary,
    onBackground: colors.text.primary,
    onSurface: colors.text.primary,
  },
  roundness: 12,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};
