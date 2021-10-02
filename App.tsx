import React from 'react';

import AppLoading from 'expo-app-loading';

import { Archivo_600SemiBold } from '@expo-google-fonts/archivo';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components';

import theme from './src/global/styles/theme';
// import SignUp from './src/screens/SignUp';
import Welcome from './src/screens/Welcome';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Archivo_600SemiBold,
    Marlin_Soft_Basic_Regular: require('./src/assets/fonts/MarlinSoftBasic-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Welcome />
      {/* <SignUp /> */}
    </ThemeProvider>
  );
}
