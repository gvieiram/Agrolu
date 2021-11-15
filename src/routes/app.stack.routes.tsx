import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AddImages } from '../components/AddImages';
import { AnnouncementDetails } from '../screens/AnnouncementDetails';
import { Chat } from '../screens/Chat';
import { Messages } from '../screens/Messages';
import { AppTabRoutes } from './app.tab.routes';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      initialRouteName="_Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="_Home" component={AppTabRoutes} />
      <Screen name="AnnouncementDetails" component={AnnouncementDetails} />
      <Screen name="Chat" component={Chat} />
      <Screen name="AddImages" component={AddImages} />
    </Navigator>
  );
}
