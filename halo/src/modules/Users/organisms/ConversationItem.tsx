import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import HaloAvatar from '../../../components/HaloAvatar';
import { ConversationInfo } from '../molecules/ConversationInfo';
import { UnreadBadge } from '../atoms/UnreadBadge';
import { colors } from '../../../constants/colors';

interface ConversationItemProps {
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  onPress: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  name,
  avatar,
  isOnline,
  lastMessage,
  lastMessageTime,
  unreadCount,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.userItem} onPress={onPress} activeOpacity={0.7}>
      <HaloAvatar name={name} avatar={avatar} isOnline={isOnline} size="medium" />

      <View style={styles.contentWrapper}>
        <ConversationInfo name={name} lastMessage={lastMessage} messageTime={lastMessageTime} />
        <UnreadBadge count={unreadCount} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(138, 138, 142, 0.2)',
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
