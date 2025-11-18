import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloAvatar from '../../../components/HaloAvatar';
import HaloText from '../../../components/HaloText';
import { ProfileBio } from '../atoms/ProfileBio';
import { colors } from '../../../constants/colors';

interface ProfileCardProps {
  avatarUrl: string;
  name: string;
  bio?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ avatarUrl, name, bio }) => {
  return (
    <View style={styles.container}>
      <HaloAvatar uri={avatarUrl} size="large" />
      <HaloText variant="subtitle" style={styles.name}>
        {name}
      </HaloText>
      <ProfileBio bio={bio} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  name: {
    marginTop: 16,
    fontWeight: '600',
  },
});
