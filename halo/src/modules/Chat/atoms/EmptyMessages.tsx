import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface EmptyMessagesProps {
  message?: string;
}

export const EmptyMessages: React.FC<EmptyMessagesProps> = ({
  message = 'Nenhuma mensagem ainda. Diga olá! 👋'
}) => {
  return (
    <View style={styles.emptyContainer}>
      <HaloText variant="body" style={styles.emptyText}>
        {message}
      </HaloText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: colors.textSecondary,
  },
});
