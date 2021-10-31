import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

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
import { AppProvider } from './src/hooks';
import { Routes } from './src/routes';

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
      <PaperProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AppProvider>
          <Routes />
        </AppProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
