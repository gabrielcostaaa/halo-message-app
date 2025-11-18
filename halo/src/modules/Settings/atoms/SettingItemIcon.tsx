import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface SettingItemIconProps {
  icon: string;
}

export const SettingItemIcon: React.FC<SettingItemIconProps> = ({ icon }) => {
  return (
    <View style={styles.iconContainer}>
      <HaloText variant="body" style={styles.icon}>
        {icon}
      </HaloText>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
});
