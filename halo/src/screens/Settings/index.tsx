import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  Bell,
  MessageSquare,
  Globe,
  Lock,
  Info,
  Search,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

import HaloText from '../../components/HaloText';
import HaloAvatar from '../../components/HaloAvatar';
import { colors } from '../../constants/colors';
import { api } from '../../services/api';
import socketService from '../../services/socket';

type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface UserProfile {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
}

interface SettingItem {
  id: string;
  label: string;
  IconComponent: React.ComponentType<any>;
  onPress?: () => void;
}

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              socketService.disconnect();
              await AsyncStorage.multiRemove(['token', 'userId']);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          },
        },
      ]
    );
  };

  const settingsItems: SettingItem[] = [
    {
      id: 'account',
      label: 'Conta',
      IconComponent: User,
      onPress: () => Alert.alert('Em breve', 'Configurações de conta'),
    },
    {
      id: 'notification',
      label: 'Notificações',
      IconComponent: Bell,
      onPress: () => Alert.alert('Em breve', 'Configurações de notificação'),
    },
    {
      id: 'chat',
      label: 'Conversas',
      IconComponent: MessageSquare,
      onPress: () => Alert.alert('Em breve', 'Configurações de chat'),
    },
    {
      id: 'data',
      label: 'Dados e armazenamento',
      IconComponent: Globe,
      onPress: () => Alert.alert('Em breve', 'Dados e armazenamento'),
    },
    {
      id: 'privacy',
      label: 'Privacidade e segurança',
      IconComponent: Lock,
      onPress: () => Alert.alert('Em breve', 'Privacidade e segurança'),
    },
    {
      id: 'about',
      label: 'Sobre',
      IconComponent: Info,
      onPress: () => Alert.alert('Halo', 'Versão 1.0.0\n\nApp de mensagens em tempo real'),
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    const { IconComponent } = item;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.settingLeft}>
          <View style={styles.iconContainer}>
            <IconComponent size={20} color={colors.primary} strokeWidth={2} />
          </View>
          <HaloText variant="body" style={styles.settingLabel}>
            {item.label}
          </HaloText>
        </View>
        <ChevronRight size={20} color={colors.textSecondary} strokeWidth={2} />
      </TouchableOpacity>
    );
  }; if (!user) {
    return (
      <View style={styles.container}>
        <HaloText variant="body">Carregando...</HaloText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <HaloText variant="title" style={styles.headerTitle}>
            Configurações
          </HaloText>
          <TouchableOpacity onPress={() => Alert.alert('Em breve', 'Busca')}>
            <Search size={24} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <HaloAvatar
            name={user.name}
            avatar={user.avatar}
            isOnline={true}
            size="large"
          />
          <View style={styles.profileInfo}>
            <HaloText variant="title" style={styles.profileName}>
              {user.name}
            </HaloText>
            <HaloText variant="caption" style={styles.profileBio}>
              {user.bio || 'Confie em seus sentimentos, seja uma boa pessoa'}
            </HaloText>
          </View>
        </View>

        {/* Settings List */}
        <View style={styles.settingsList}>
          {settingsItems.map(renderSettingItem)}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <LogOut size={20} color={colors.error} strokeWidth={2} />
          <HaloText variant="body" style={styles.logoutText}>
            Sair da conta
          </HaloText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  settingsList: {
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(138, 138, 142, 0.2)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(109, 234, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    color: colors.error,
    marginLeft: 8,
    fontWeight: '600',
  },
});
