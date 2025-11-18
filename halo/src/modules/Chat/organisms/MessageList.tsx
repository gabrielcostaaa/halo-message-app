import React from 'react';
import { FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import HaloCard from '../../../components/HaloCard';
import { EmptyMessages } from '../atoms/EmptyMessages';

interface Message {
  _id: string;
  content: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
  read: boolean;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const renderMessage = ({ item }: ListRenderItemInfo<Message>) => {
    const isSentByMe = item.senderId === currentUserId;

    return (
      <HaloCard
        content={item.content}
        timestamp={item.timestamp}
        isSentByMe={isSentByMe}
        read={item.read}
      />
    );
  };

  return (
    <FlatList
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.messagesContainer}
      inverted
      ListEmptyComponent={<EmptyMessages />}
    />
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    padding: 16,
    flexGrow: 1,
  },
});
