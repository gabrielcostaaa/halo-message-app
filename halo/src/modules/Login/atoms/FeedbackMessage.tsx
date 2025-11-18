import React from 'react';
import { StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface FeedbackMessageProps {
  type: 'error' | 'success';
  message: string;
}

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ type, message }) => {
  return (
    <HaloText
      variant="caption"
      style={[styles.feedback, type === 'error' ? styles.error : styles.success]}
    >
      {message}
    </HaloText>
  );
};

const styles = StyleSheet.create({
  feedback: {
    marginBottom: 12,
  },
  error: {
    color: colors.error,
  },
  success: {
    color: colors.success,
  },
});
