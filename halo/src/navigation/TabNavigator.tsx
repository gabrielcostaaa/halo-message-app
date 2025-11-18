import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageCircle, Clock, Phone, User } from 'lucide-react-native';

import UsersScreen from '../screens/Users';
import SettingsScreen from '../screens/Settings';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 0,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: false, // Remove os labels
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tab.Screen
        name="Conversations"
        component={UsersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Contacts"
        component={UsersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Clock color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={UsersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Phone color={color} size={size} strokeWidth={2} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
