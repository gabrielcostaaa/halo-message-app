import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import HaloText from '../HaloText';
import { colors } from '../../constants/colors';

interface HaloCardProps {
  content: string;
  timestamp: string | Date;
  isSent?: boolean;
  isRead?: boolean;
  style?: ViewStyle;
}

const HaloCard: React.FC<HaloCardProps> = ({
  content,
  timestamp,
  isSent = false,
  isRead = false,
  style,
}) => {
  const formatTime = (time: string | Date): string => {
    const date = typeof time === 'string' ? new Date(time) : time;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View
      style={[
        styles.container,
        isSent ? styles.sentContainer : styles.receivedContainer,
        style,
      ]}
    >
      <View
        style={[
          styles.card,
          isSent ? styles.sentCard : styles.receivedCard,
        ]}
      >
        <HaloText variant="body" style={[styles.content, isSent && styles.sentContent]}>
          {content}
        </HaloText>

        <View style={styles.footer}>
          <HaloText variant="caption" style={[styles.timestamp, isSent && styles.sentTimestamp]}>
            {formatTime(timestamp)}
          </HaloText>

          {isSent && (
            <HaloText variant="caption" style={styles.sentReadStatus}>
              {isRead ? '✓✓' : '✓'}
            </HaloText>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  sentContainer: {
    justifyContent: 'flex-end',
  },
  receivedContainer: {
    justifyContent: 'flex-start',
  },
  card: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sentCard: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  receivedCard: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
  },
  content: {
    color: colors.textPrimary,
    marginBottom: 4,
  },
  sentContent: {
    color: '#000000', // Texto preto para mensagens enviadas
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  timestamp: {
    fontSize: 11,
    color: colors.textSecondary,
    opacity: 0.8,
  },
  sentTimestamp: {
    color: '#000000', // Timestamp preto para mensagens enviadas
    opacity: 0.6,
  },
  readStatus: {
    fontSize: 11,
    color: colors.textSecondary,
    opacity: 0.8,
  },
  sentReadStatus: {
    fontSize: 11,
    color: '#000000', // Status de leitura preto para mensagens enviadas
    opacity: 0.6,
  },
});

export default HaloCard;
