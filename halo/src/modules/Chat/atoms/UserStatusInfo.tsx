import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface UserStatusInfoProps {
  name: string;
  isOnline: boolean;
}

export const UserStatusInfo: React.FC<UserStatusInfoProps> = ({ name, isOnline }) => {
  return (
    <View style={styles.headerInfo}>
      <HaloText variant="body" style={styles.headerName}>
        {name}
      </HaloText>
      <HaloText variant="caption" style={styles.headerStatus}>
        {isOnline ? 'Online' : 'Offline'}
      </HaloText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerName: {
    fontWeight: '600',
  },
  headerStatus: {
    marginTop: 2,
  },
});
