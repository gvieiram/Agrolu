import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import Home from '../screens/Home';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.green_dark_main,
        tabBarActiveBackgroundColor: theme.colors.green_light_3,
      }}
    >
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
