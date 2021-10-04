import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';

import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Cadastro" component={SignUp} />
    </Stack.Navigator>
  );
}
