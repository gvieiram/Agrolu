import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
