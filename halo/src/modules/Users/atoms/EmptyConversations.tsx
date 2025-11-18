import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface EmptyConversationsProps {
  message?: string;
}

export const EmptyConversations: React.FC<EmptyConversationsProps> = ({
  message = 'Nenhum usuário encontrado'
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
