import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SettingRow } from '../molecules/SettingRow';

interface SettingsListProps {
  onEditProfile?: () => void;
  onNotifications?: () => void;
  onPrivacy?: () => void;
  onHelp?: () => void;
}

export const SettingsList: React.FC<SettingsListProps> = ({
  onEditProfile,
  onNotifications,
  onPrivacy,
  onHelp
}) => {
  return (
    <View style={styles.container}>
      <SettingRow icon="👤" label="Editar Perfil" onPress={onEditProfile} />
      <SettingRow icon="🔔" label="Notificações" onPress={onNotifications} />
      <SettingRow icon="🔒" label="Privacidade" onPress={onPrivacy} />
      <SettingRow icon="❓" label="Ajuda" onPress={onHelp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
});
