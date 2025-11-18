import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HaloText from '../../components/HaloText';
import HaloAvatar from '../../components/HaloAvatar';
import { colors } from '../../constants/colors';
import { api } from '../../services/api';
import socketService from '../../services/socket';

type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Chat: {
    recipientId: string;
    recipientName: string;
    recipientAvatar?: string;
  };
};

type TabParamList = {
  Conversations: undefined;
  Contacts: undefined;
  Calls: undefined;
  Settings: undefined;
};

type UsersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Conversations'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface User {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export default function UsersScreen() {
  const navigation = useNavigation<UsersScreenNavigationProp>();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Carregar userId e conectar socket
  useEffect(() => {
    const loadUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        setCurrentUserId(userId);

        // Conectar socket
        if (userId && !socketService.isConnected()) {
          socketService.connect(userId);
        }
      } catch (error) {
        console.error('Erro ao carregar userId:', error);
      }
    };

    loadUserId();
  }, []);

  // Buscar lista de usuários
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/messages/conversations/${currentUserId}`);
      setUsers(response.data);
    } catch (error: any) {
      console.error('Erro ao buscar conversas:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  // Listener para atualizar status online/offline
  useEffect(() => {
    const handleUserStatus = (data: { userId: string; isOnline: boolean }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === data.userId ? { ...user, isOnline: data.isOnline } : user
        )
      );
    };

    socketService.onUserStatus(handleUserStatus);

    return () => {
      socketService.off('user_status', handleUserStatus);
    };
  }, []);

  // Listener para atualizar preview quando uma nova mensagem chegar
  useEffect(() => {
    const handleNewMessage = (_message: any) => {
      // Atualizar a lista de conversas quando receber nova mensagem
      if (currentUserId) {
        fetchUsers();
      }
    };

    socketService.onNewMessage(handleNewMessage);

    return () => {
      socketService.off('new_message', handleNewMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  const handleUserPress = (user: User) => {
    navigation.navigate('Chat', {
      recipientId: user._id,
      recipientName: user.name,
      recipientAvatar: user.avatar,
    });
  };

  const formatMessageTime = (timestamp: string | null | undefined): string => {
    if (!timestamp) return '';

    const messageDate = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - messageDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInHours < 24) {
      // Mostrar hora (HH:MM)
      return messageDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffInDays < 7) {
      // Mostrar dia da semana
      return messageDate.toLocaleDateString('pt-BR', { weekday: 'short' });
    } else {
      // Mostrar data (DD/MM)
      return messageDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      });
    }
  };

  const renderUser = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => handleUserPress(item)}
      activeOpacity={0.7}
    >
      <HaloAvatar
        name={item.name}
        avatar={item.avatar}
        isOnline={item.isOnline}
        size="medium"
      />

      <View style={styles.userContent}>
        <View style={styles.userHeader}>
          <HaloText variant="body" style={styles.userName}>
            {item.name}
          </HaloText>
          <HaloText variant="caption" style={styles.messageTime}>
            {formatMessageTime(item.lastMessageTime)}
          </HaloText>
        </View>

        <View style={styles.messagePreview}>
          <HaloText
            variant="caption"
            style={styles.lastMessage}
            numberOfLines={1}
          >
            {item.lastMessage || 'Toque para iniciar uma conversa'}
          </HaloText>
          {item.unreadCount && item.unreadCount > 0 && (
            <View style={styles.badge}>
              <HaloText variant="caption" style={styles.badgeText}>
                {item.unreadCount}
              </HaloText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HaloText variant="title" style={styles.headerTitle}>
          Conversas
        </HaloText>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderUser}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <HaloText variant="body" style={styles.emptyText}>
              Nenhum usuário encontrado
            </HaloText>
          </View>
        }
      />
    </View>
  );
}

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
  listContent: {
    flexGrow: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(138, 138, 142, 0.2)',
  },
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
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  badgeText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '700',
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
});
