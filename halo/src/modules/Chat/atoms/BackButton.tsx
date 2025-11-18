import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';

interface BackButtonProps {
  onPress: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <HaloText variant="subtitle">←</HaloText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginRight: 12,
  },
});
