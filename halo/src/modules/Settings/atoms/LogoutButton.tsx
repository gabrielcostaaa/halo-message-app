import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface LogoutButtonProps {
  onPress: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
      <HaloText variant="body" style={styles.logoutText}>
        Sair
      </HaloText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: colors.error,
    borderRadius: 8,
    alignSelf: 'center',
  },
  logoutText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
