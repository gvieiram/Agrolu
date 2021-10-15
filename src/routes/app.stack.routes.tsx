import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AnnouncementDetails } from '../screens/AnnouncementDetails';
import Home from '../screens/Home';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="AnnouncementDetails" component={AnnouncementDetails} />
    </Navigator>
  );
}
