// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/constants/colors';

function App() {
  return (
    <View style={styles.root}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <AppNavigator />
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
