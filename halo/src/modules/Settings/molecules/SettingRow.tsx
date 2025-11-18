import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { SettingItemIcon } from '../atoms/SettingItemIcon';
import { colors } from '../../../constants/colors';

interface SettingRowProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

export const SettingRow: React.FC<SettingRowProps> = ({ icon, label, onPress }) => {
  const content = (
    <View style={styles.container}>
      <SettingItemIcon icon={icon} />
      <HaloText variant="body" style={styles.label}>
        {label}
      </HaloText>
      <HaloText variant="body" style={styles.chevron}>
        ›
      </HaloText>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.touchable}>{content}</View>;
};

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    flex: 1,
  },
  chevron: {
    fontSize: 24,
    color: colors.textSecondary,
  },
});
