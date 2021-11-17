import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AddImages } from '../components/AddImages';
import { AnnouncementDetails } from '../screens/AnnouncementDetails';
import AnnouncementSaved from '../screens/AnnouncementSaved';
import { Chat } from '../screens/Chat';
import { EditAnnouncement } from '../screens/EditAnnouncement';
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
      <Screen name="EditAnnouncement" component={EditAnnouncement} />
      <Screen name="AnnouncementSaved" component={AnnouncementSaved} />
    </Navigator>
  );
}
