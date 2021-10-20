import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Confirmation from '../screens/Confirmation';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUpStepOne from '../screens/SignUp/SignUpStepOne';
import SignUpStepTwo from '../screens/SignUp/SignUpStepTwo';
import Welcome from '../screens/Welcome';
import { AppStackRoutes } from './app.stack.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="SignUpStepOne" component={SignUpStepOne} />
      <Screen name="SignUpStepTwo" component={SignUpStepTwo} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="SignIn" component={SignIn} />
      {/* <Screen name="Home" component={AppStackRoutes} /> */}
    </Navigator>
  );
}
