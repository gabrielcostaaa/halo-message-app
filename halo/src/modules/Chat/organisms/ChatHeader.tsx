import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BackButton } from '../atoms/BackButton';
import { ChatHeaderInfo } from '../molecules/ChatHeaderInfo';
import { colors } from '../../../constants/colors';

interface ChatHeaderProps {
  avatarUrl: string;
  name: string;
  isOnline: boolean;
  onBack: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  avatarUrl,
  name,
  isOnline,
  onBack
}) => {
  return (
    <View style={styles.header}>
      <BackButton onPress={onBack} />
      <ChatHeaderInfo avatarUrl={avatarUrl} name={name} isOnline={isOnline} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
