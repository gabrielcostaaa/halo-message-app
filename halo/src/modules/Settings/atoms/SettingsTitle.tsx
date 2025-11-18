import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';

export const SettingsTitle: React.FC = () => {
  return (
    <View style={styles.container}>
      <HaloText variant="title">Configurações</HaloText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
