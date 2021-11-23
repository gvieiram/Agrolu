import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const [notification, setNotification] = useState(false);
  const responseListener = useRef();
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Archivo_600SemiBold,
    Marlin_Soft_Basic_Regular: require('./src/assets/fonts/MarlinSoftBasic-Regular.otf'),
  });

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
    SecureStore.getItemAsync('expo_push_token').then(token => {
      if (!token) {
        registerForPushNotificationsAsync().then(newToken => {
          if (newToken) {
            SecureStore.setItemAsync('expo_push_token', newToken);
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
