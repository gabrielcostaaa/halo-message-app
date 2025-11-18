import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProfileCard } from '../molecules/ProfileCard';

interface ProfileSectionProps {
  avatarUrl: string;
  name: string;
  bio?: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ avatarUrl, name, bio }) => {
  return (
    <View style={styles.container}>
      <ProfileCard avatarUrl={avatarUrl} name={name} bio={bio} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
});
