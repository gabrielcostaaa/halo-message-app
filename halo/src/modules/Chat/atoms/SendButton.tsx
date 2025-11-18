import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface SendButtonProps {
  onPress: () => void;
  disabled: boolean;
}

export const SendButton: React.FC<SendButtonProps> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.sendButton, disabled && styles.sendButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <HaloText variant="body" style={styles.sendButtonText}>
        ➤
      </HaloText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: colors.surface,
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 20,
    color: colors.textPrimary,
  },
});
