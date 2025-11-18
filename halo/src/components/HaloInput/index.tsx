import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';

export interface HaloInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function HaloInput({ label, error, style, ...props }: HaloInputProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, style]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  error: {
    marginTop: 4,
    color: colors.error,
    fontSize: 13,
  },
});
