import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <HaloText variant="title">{title}</HaloText>
      <HaloText variant="body" style={styles.subtitle}>
        {subtitle}
      </HaloText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 8,
    color: colors.textSecondary,
  },
});
