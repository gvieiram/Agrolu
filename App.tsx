import React, { useEffect, useState, useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppLoading from 'expo-app-loading';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';

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
import UserApi from './src/services/api/UserApi';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Archivo_600SemiBold,
    Marlin_Soft_Basic_Regular: require('./src/assets/fonts/MarlinSoftBasic-Regular.otf'),
  });
  const [initialMount, setInitialMount] = useState(true);
  const notificationListener = useRef();
  const [notification, setNotification] = useState(false);
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;

    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
    }

    console.log('Must use physical device for Push Notifications');

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  useEffect(() => {
    SecureStore.getItemAsync('expoToken').then(token => {
      if (token) {
        registerForPushNotificationsAsync().then(newToken => {
          if (newToken) {
            UserApi.storeToken(newToken).then(() =>
              SecureStore.setItemAsync('expoToken', newToken),
            );
          }
        });
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notifications => {
        setNotification(notifications);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
