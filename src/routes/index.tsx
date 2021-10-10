import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  return (
    <NavigationContainer>
      {/* <AuthRoutes /> */}
      <AppTabRoutes />
    </NavigationContainer>
  );
}
