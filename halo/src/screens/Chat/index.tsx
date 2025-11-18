import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HaloText from '../../components/HaloText';
import HaloCard from '../../components/HaloCard';
import HaloAvatar from '../../components/HaloAvatar';
import { colors } from '../../constants/colors';
import { api } from '../../services/api';
import socketService from '../../services/socket';

type AppStackParamList = {
  Login: undefined;
  Users: undefined;
  Chat: {
    recipientId: string;
    recipientName: string;
    recipientAvatar?: string;
  };
};

type ChatScreenRouteProp = RouteProp<AppStackParamList, 'Chat'>;
type ChatScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Chat'>;

interface Message {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { recipientId, recipientName, recipientAvatar } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isRecipientOnline, setIsRecipientOnline] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  // Buscar userId do AsyncStorage
  useEffect(() => {
    const loadUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        setCurrentUserId(userId);

        // Conectar socket se não estiver conectado
        if (userId && !socketService.isConnected()) {
          socketService.connect(userId);
        }
      } catch (error) {
        console.error('Erro ao carregar userId:', error);
      }
    };

    loadUserId();
  }, []);

  // Buscar histórico de mensagens
  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUserId) return;

      try {
        setLoading(true);
        const response = await api.get(`/messages/${recipientId}`, {
          params: { currentUserId },
        });
        setMessages(response.data);

        // Marcar mensagens como lidas ao abrir a conversa
        socketService.markAsRead(recipientId);
      } catch (error: any) {
        console.error('Erro ao buscar mensagens:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [recipientId, currentUserId]);

  // Listener para novas mensagens
  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      // Adicionar apenas mensagens relacionadas a esta conversa
      if (
        (message.sender === recipientId && message.recipient === currentUserId) ||
        (message.sender === currentUserId && message.recipient === recipientId)
      ) {
        setMessages((prev) => [...prev, message]);

        // Scroll para o final
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    };

    socketService.onNewMessage(handleNewMessage);

    return () => {
      socketService.off('new_message', handleNewMessage);
    };
  }, [recipientId, currentUserId]);

  // Listener para status de usuários
  useEffect(() => {
    const handleUserStatus = (data: { userId: string; isOnline: boolean }) => {
      if (data.userId === recipientId) {
        setIsRecipientOnline(data.isOnline);
      }
    };

    socketService.onUserStatus(handleUserStatus);

    return () => {
      socketService.off('user_status', handleUserStatus);
    };
  }, [recipientId]);

  // Listener para quando mensagens são lidas
  useEffect(() => {
    const handleMessagesRead = (data: { recipientId: string; count: number }) => {
      if (data.recipientId === recipientId) {
        // Atualizar todas as mensagens enviadas para este destinatário como lidas
        setMessages((prev) =>
          prev.map((msg) =>
            msg.sender === currentUserId && msg.recipient === recipientId
              ? { ...msg, read: true }
              : msg
          )
        );
      }
    };

    socketService.onMessagesRead(handleMessagesRead);

    return () => {
      socketService.off('messages_read', handleMessagesRead);
    };
  }, [recipientId, currentUserId]);

  const handleSendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed || !currentUserId) return;

    // Enviar via socket (o servidor retornará via 'new_message' para ambos)
    socketService.sendMessage(recipientId, trimmed);
    setInputText('');

    // Scroll para o final
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isSent = item.sender === currentUserId;

    return (
      <HaloCard
        content={item.content}
        timestamp={item.timestamp}
        isSent={isSent}
        isRead={item.read}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <HaloText variant="subtitle">←</HaloText>
        </TouchableOpacity>

        <HaloAvatar
          name={recipientName}
          avatar={recipientAvatar}
          isOnline={isRecipientOnline}
          size="small"
        />

        <View style={styles.headerInfo}>
          <HaloText variant="body" style={styles.headerName}>
            {recipientName}
          </HaloText>
          <HaloText variant="caption" style={styles.headerStatus}>
            {isRecipientOnline ? 'Online' : 'Offline'}
          </HaloText>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {renderHeader()}

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <HaloText variant="body" style={styles.emptyText}>
              Nenhuma mensagem ainda. Diga olá! 👋
            </HaloText>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite uma mensagem..."
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={500}
        />

        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <HaloText variant="body" style={styles.sendButtonText}>
            ➤
          </HaloText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 12,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerName: {
    fontWeight: '600',
  },
  headerStatus: {
    marginTop: 2,
  },
  messagesList: {
    paddingVertical: 12,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: colors.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    color: colors.textPrimary,
    fontSize: 16,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: colors.surface,
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 20,
    color: colors.textPrimary,
  },
});

export default ChatScreen;
