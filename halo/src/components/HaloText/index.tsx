import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { colors } from '../../constants/colors';

type HaloTextVariant = 'title' | 'subtitle' | 'body' | 'caption';

export interface HaloTextProps extends TextProps {
  variant?: HaloTextVariant;
  children: React.ReactNode;
}

export default function HaloText({
  variant = 'body',
  style,
  children,
  ...props
}: HaloTextProps) {
  return (
    <Text style={[styles.base, styles[variant], style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.textPrimary,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});