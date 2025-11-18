import React from 'react';
import { View, StyleSheet, ViewStyle, Image, Platform } from 'react-native';
import HaloText from '../HaloText';
import { colors } from '../../constants/colors';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

interface HaloAvatarProps {
  name: string;
  avatar?: string | null;
  isOnline?: boolean;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const HaloAvatar: React.FC<HaloAvatarProps> = ({
  name,
  avatar,
  isOnline = false,
  size = 'medium',
  style,
}) => {
  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const sizeStyles = {
    small: { width: 40, height: 40, borderRadius: 20 },
    medium: { width: 56, height: 56, borderRadius: 28 },
    large: { width: 80, height: 80, borderRadius: 40 },
  };

  const textVariants = {
    small: 'caption',
    medium: 'body',
    large: 'subtitle',
  };

  const onlineIndicatorSizes = {
    small: { width: 12, height: 12, borderRadius: 6, borderWidth: 2 },
    medium: { width: 16, height: 16, borderRadius: 8, borderWidth: 3 },
    large: { width: 22, height: 22, borderRadius: 11, borderWidth: 3 },
  };

  const avatarUrl = avatar ? `${API_URL}/avatars/${avatar}` : null;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.avatar, sizeStyles[size]]}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={[styles.avatarImage, sizeStyles[size]]}
            resizeMode="cover"
          />
        ) : (
          <HaloText
            variant={textVariants[size] as any}
            style={styles.avatarText}
          >
            {getInitials(name)}
          </HaloText>
        )}
      </View>

      {isOnline !== undefined && (
        <View
          style={[
            styles.onlineIndicator,
            onlineIndicatorSizes[size],
            { backgroundColor: isOnline ? colors.online : colors.offline },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderColor: colors.background,
  },
});

export default HaloAvatar;
