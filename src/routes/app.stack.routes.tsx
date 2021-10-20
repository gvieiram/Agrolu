import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AnnouncementDetails } from '../screens/AnnouncementDetails';
import { Chat } from '../screens/Chat';
import { AppTabRoutes } from './app.tab.routes';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="_Home" component={AppTabRoutes} />
      <Screen name="AnnouncementDetails" component={AnnouncementDetails} />
      <Screen name="Chat" component={Chat} />
    </Navigator>
  );
}
