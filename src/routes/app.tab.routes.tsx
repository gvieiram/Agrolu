import React from 'react';
import { Platform } from 'react-native';

import { BlurView } from 'expo-blur';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import IconAdd from '../assets/img/add.svg';
import IconBolt from '../assets/img/bolt.svg';
import IconHome from '../assets/img/home.svg';
import IconMore from '../assets/img/more.svg';
import IconPerson from '../assets/img/person.svg';
import IconWechat from '../assets/img/wechat.svg';
import { AddAnnouncement } from '../screens/AddAnnouncement';
import { AnnouncementDetails } from '../screens/AnnouncementDetails';
import Home from '../screens/Home';
import { Messages } from '../screens/Messages';
import { More } from '../screens/More';
import { AppStackRoutes } from './app.stack.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.green_dark_main,
        tabBarActiveBackgroundColor: theme.colors.green_light_3,
        tabBarInactiveTintColor: theme.colors.green_main,
        tabBarBackground: () => <BlurView tint="light" intensity={100} />,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: 'absolute',
          height: 58,
          alignItems: 'center',
          bottom: Platform.OS === 'ios' ? 25 : 15,
          zIndex: 10,
          marginHorizontal: 30,
          backgroundColor: theme.colors.green_dark_main,

          borderRadius: 35,
          shadowRadius: 8,
          shadowOpacity: 0.3,
          elevation: 5,
          shadowOffset: { width: 0, height: 8 },
          padding: Platform.OS === 'ios' ? 8 : 0,
        },
        tabBarItemStyle: {
          height: 40,
          maxWidth: 70,
          borderRadius: 22,

          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: Platform.OS === 'ios' ? 'auto' : 'center',

          marginHorizontal: 5,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <IconHome width={32} height={32} fill={color} />
          ),
        }}
      />
      <Screen
        name="AddAnnouncement"
        component={AddAnnouncement}
        options={{
          tabBarIcon: ({ color }) => (
            <IconAdd width={32} height={32} fill={color} />
          ),
        }}
      />
      <Screen
        name="MessagesRoom"
        component={Messages}
        options={{
          tabBarIcon: ({ color }) => (
            <IconWechat width={32} height={32} fill={color} />
          ),
        }}
      />
      <Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ color }) => (
            <IconMore width={32} height={32} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
