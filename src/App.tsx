import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShiftListScreen } from './screens/shift-list-screen';
import { ShiftDetailScreen } from './screens/shift-detail-screen';
import { APP_ROUTES } from './utils';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={APP_ROUTES.SHIFT_LIST}
          component={ShiftListScreen}
          options={{ title: 'Доступные смены', headerTitleAlign: 'center',}}
        />
       <Stack.Screen
          name={APP_ROUTES.SHIFT_DETAILS}
          component={ShiftDetailScreen}
          options={{ title: 'Детали смены', headerTitleAlign: 'center', }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
