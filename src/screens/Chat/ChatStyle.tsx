/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Linking, View } from 'react-native';
import { Bubble, InputToolbar, Send } from 'react-native-gifted-chat';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import theme from '../../global/styles/theme';

export const renderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: theme.colors.green_dark_opaque,
        },
      }}
    />
  );
};

export const renderSend = props => {
  return (
    <Send {...props}>
      <View>
        <MaterialIcons
          name="send"
          size={26}
          color={theme.colors.green_dark_opaque}
          style={{
            paddingTop: 10,
            marginBottom: 10,
            marginRight: 10,
          }}
        />
      </View>
    </Send>
  );
};

export const scrollToBottomComponent = () => {
  return (
    <MaterialCommunityIcons
      name="chevron-double-down"
      size={24}
      color={theme.colors.title_item_gray}
    />
  );
};

export const parsePatterns = (_linkStyle: any) => {
  return [
    {
      pattern: /#(\w+)/,
      style: _linkStyle,
      onPress: tag => console.log(`Pressed on hashtag: ${tag}`),
    },
    {
      pattern: /([(]\d{2,3}[)]\s?)?\d{4,5}[-]\d{4}/,
      style: _linkStyle,
      onPress: phone => Linking.openURL(`tel: ${phone}`),
    },
  ];
};

export const renderInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        justifyContent: 'center',
        borderTopWidth: 0,
      }}
    />
  );
};

export const renderChatFooter = () => {
  return (
    <View
      style={{
        height: 15,
        backgroundColor: 'transparent',
      }}
    />
  );
};
