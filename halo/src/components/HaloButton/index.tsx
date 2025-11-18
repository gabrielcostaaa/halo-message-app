import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/colors';

export type HaloButtonVariant = 'primary' | 'secondary' | 'text';

export interface HaloButtonProps extends PressableProps {
  label: string;
  variant?: HaloButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function HaloButton({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  style,
  disabled,
  ...props
}: HaloButtonProps) {
  const isDisabled = disabled || loading;

  const resolveStyle = ({ pressed }: PressableStateCallbackType) => {
    const extraStyle =
      typeof style === 'function'
        ? style({ pressed })
        : (style as StyleProp<ViewStyle>);

    return [
      styles.base,
      fullWidth && styles.fullWidth,
      styles[variant],
      isDisabled && styles.disabled,
      pressed && !isDisabled && styles.pressed,
      extraStyle,
    ];
  };

  return (
    <Pressable
      accessibilityRole="button"
      style={resolveStyle}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? colors.primary : colors.textPrimary} />
      ) : (
        <Text style={[styles.label, variant === 'text' && styles.labelTextVariant]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 6,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    backgroundColor: 'transparent',
    height: undefined,
    marginVertical: 0,
  },
  label: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: 16,
  },
  labelTextVariant: {
    color: colors.secondary,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});
