import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface ProfileBioProps {
  bio?: string;
}

export const ProfileBio: React.FC<ProfileBioProps> = ({ bio }) => {
  if (!bio) return null;

  return (
    <View style={styles.container}>
      <HaloText variant="body" style={styles.bioText}>
        {bio}
      </HaloText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  bioText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
