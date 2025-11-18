import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface UnreadBadgeProps {
  count: number;
}

export const UnreadBadge: React.FC<UnreadBadgeProps> = ({ count }) => {
  if (count <= 0) return null;

  return (
    <View style={styles.badge}>
      <HaloText variant="caption" style={styles.badgeText}>
        {count}
      </HaloText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  badgeText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '700',
  },
});
