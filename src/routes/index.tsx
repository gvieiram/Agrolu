import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AppStackRoutes } from './app.stack.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
      {/* <AppStackRoutes /> */}
    </NavigationContainer>
  );
}
