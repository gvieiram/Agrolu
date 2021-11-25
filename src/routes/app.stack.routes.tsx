import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AnnouncementDetails } from '../screens/AnnouncementDetails';
import AnnouncementSaved from '../screens/AnnouncementSaved';
import { Chat } from '../screens/Chat';
import { EditAnnouncement } from '../screens/EditAnnouncement';
import UserAnnouncements from '../screens/UserAnnouncements';
import { UserVerification } from '../screens/UserVerification';
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
      <Screen name="EditAnnouncement" component={EditAnnouncement} />
      <Screen name="AnnouncementSaved" component={AnnouncementSaved} />
      <Screen name="UserAnnouncements" component={UserAnnouncements} />
      <Screen name="UserVerification" component={UserVerification} />
    </Navigator>
  );
}
