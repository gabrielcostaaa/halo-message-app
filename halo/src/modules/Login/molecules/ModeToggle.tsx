import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import HaloButton from '../../../components/HaloButton';

interface ModeToggleProps {
  isRegisterMode: boolean;
  onToggle: () => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ isRegisterMode, onToggle }) => {
  return (
    <View style={styles.toggleRow}>
      <HaloText variant="body" style={styles.toggleLabel}>
        {isRegisterMode ? 'Já possui conta?' : 'Ainda não tem conta?'}
      </HaloText>
      <HaloButton
        variant="text"
        label={isRegisterMode ? 'Fazer login' : 'Criar conta'}
        onPress={onToggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    marginRight: 6,
  },
});
