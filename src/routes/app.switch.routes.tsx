import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { AnnouncementDetails } from '../screens/AnnouncementDetails';
import { Chat } from '../screens/Chat';
import Home from '../screens/Home';

const SwitchRoutes = createSwitchNavigator({
  _home: Home,
  _announcementDetails: AnnouncementDetails,
  // Chat,
});

export default createAppContainer(SwitchRoutes);
