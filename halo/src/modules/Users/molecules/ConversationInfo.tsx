import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface ConversationInfoProps {
  name: string;
  lastMessage: string;
  messageTime: string;
}

export const ConversationInfo: React.FC<ConversationInfoProps> = ({
  name,
  lastMessage,
  messageTime,
}) => {
  return (
    <View style={styles.userContent}>
      <View style={styles.userHeader}>
        <HaloText variant="body" style={styles.userName}>
          {name}
        </HaloText>
        <HaloText variant="caption" style={styles.messageTime}>
          {messageTime}
        </HaloText>
      </View>

      <View style={styles.messagePreview}>
        <HaloText variant="caption" style={styles.lastMessage} numberOfLines={1}>
          {lastMessage}
        </HaloText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  messageTime: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
    lineHeight: 18,
  },
});
