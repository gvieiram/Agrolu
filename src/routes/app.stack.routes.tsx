import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Screen name="" component={} /> */}
    </Navigator>
  );
}
