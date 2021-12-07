import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Confirmation from '../screens/Confirmation';
import ForgotPassStepOne from '../screens/ForgotPassword/ForgotPassStepOne';
import ForgotPassStepThree from '../screens/ForgotPassword/ForgotPassStepThree';
import ForgotPassStepTwo from '../screens/ForgotPassword/ForgotPassStepTwo';
import SignIn from '../screens/SignIn';
import SignUpStepOne from '../screens/SignUp/SignUpStepOne';
import SignUpStepTwo from '../screens/SignUp/SignUpStepTwo';
import Welcome from '../screens/Welcome';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="SignUpStepOne" component={SignUpStepOne} />
      <Screen name="SignUpStepTwo" component={SignUpStepTwo} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="ForgotPassStepOne" component={ForgotPassStepOne} />
      <Screen name="ForgotPassStepTwo" component={ForgotPassStepTwo} />
      <Screen name="ForgotPassStepThree" component={ForgotPassStepThree} />
    </Navigator>
  );
}
