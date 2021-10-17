import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { getSecureToken, useAuth } from '../hooks/auth';
import { AppStackRoutes } from './app.stack.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppStackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
