import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloAvatar from '../../../components/HaloAvatar';
import { UserStatusInfo } from '../atoms/UserStatusInfo';

interface ChatHeaderInfoProps {
  avatarUrl: string;
  name: string;
  isOnline: boolean;
}

export const ChatHeaderInfo: React.FC<ChatHeaderInfoProps> = ({
  avatarUrl,
  name,
  isOnline
}) => {
  return (
    <View style={styles.container}>
      <HaloAvatar uri={avatarUrl} size={40} />
      <UserStatusInfo name={name} isOnline={isOnline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
