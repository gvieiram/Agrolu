import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.green_dark,
        tabBarActiveBackgroundColor: theme.colors.green_light_1,
      }}
    >
      {/* <Screen name="Welcome" component={Welcome} /> */}
      {/* <Screen name="Cadastro" component={SignUp} /> */}
    </Navigator>
  );
}
