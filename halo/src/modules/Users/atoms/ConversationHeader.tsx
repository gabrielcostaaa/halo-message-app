import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloText from '../../../components/HaloText';
import { colors } from '../../../constants/colors';

interface ConversationHeaderProps {
  title: string;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <HaloText variant="title" style={styles.headerTitle}>
        {title}
      </HaloText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
  headerTitle: {
    flex: 1,
    fontSize: 32,
    fontWeight: '700',
  },
});
