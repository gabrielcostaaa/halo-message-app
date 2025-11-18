import React from 'react';
import { View, StyleSheet } from 'react-native';
import HaloInput from '../../../components/HaloInput';
import { SendButton } from '../atoms/SendButton';

interface MessageInputBarProps {
  message: string;
  onChangeMessage: (text: string) => void;
  onSend: () => void;
}

export const MessageInputBar: React.FC<MessageInputBarProps> = ({
  message,
  onChangeMessage,
  onSend
}) => {
  return (
    <View style={styles.container}>
      <HaloInput
        placeholder="Digite uma mensagem..."
        value={message}
        onChangeText={onChangeMessage}
        style={styles.input}
      />
      <SendButton onPress={onSend} disabled={!message.trim()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
  },
});
