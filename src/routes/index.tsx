import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';
import { AppStackRoutes } from './app.stack.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { signed } = useAuth();

  return (
    <NavigationContainer>
      {signed ? <AppStackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
