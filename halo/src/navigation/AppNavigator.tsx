import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { enableScreens } from 'react-native-screens';
import LoginScreen from '../screens/Login';
import TabNavigator from './TabNavigator';
import ChatScreen from '../screens/Chat';

// enableScreens();

export type AppStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Chat: {
    recipientId: string;
    recipientName: string;
    recipientAvatar?: string;
  };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
