import React, { useEffect, useState, useCallback } from 'react';
import { LogBox } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import 'dayjs/locale/pt-br';

import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import Echo from 'laravel-echo';
import _ from 'lodash';
import Pusher from 'pusher-js/react-native';
import { useTheme } from 'styled-components';

import { RoomResponse } from '../../dtos/response/RoomResponseDTO';
import { useAuth } from '../../hooks/auth';
import MessageApi from '../../services/api/MessageApi';
import {
  parsePatterns,
  renderBubble,
  renderSend,
  scrollToBottomComponent,
  renderInputToolbar,
  renderChatFooter,
} from './ChatStyle';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  BackButton,
  AnnouncementRef,
  Image,
  Description,
  Title,
  Price,
  ChatView,
} from './styles';

// Continuando com warning -> yarn add expo-dev-client
LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
// eslint-disable-next-line no-underscore-dangle
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

interface Params {
  room: RoomResponse;
}

export function Chat() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { token, user } = useAuth();
  const [load, setLoad] = useState(false);
  const route = useRoute();
  const { room } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    MessageApi.all(room.id).then(response =>
      response.data.map(message =>
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [
            {
              _id: message.id,
              text: message.message,
              createdAt: new Date(message.created_at),
              user: {
                _id: message.user_id,
              },
            },
          ]),
        ),
      ),
    );
  };

  if (!load) {
    const pusher = new Pusher('791041aa436839eaaf80', {
      cluster: 'us2',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
      forceTLS: true,
      authEndpoint: 'https://agrolu.xyz/broadcasting/auth',
    });
    const broadcast = new Echo({
      broadcaster: 'pusher',
      key: '791041aa436839eaaf80',
      cluster: 'us2',
      encrypted: true,
      client: pusher,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
      useTLS: true,
      authEndpoint: 'https://agrolu.xyz/broadcasting/auth',
    });
    broadcast.private(`chat.${room.id}`).listen('MessageSent', e => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: e.messageId,
            text: e.messageText,
            createdAt: new Date(e.createdAt),
            user: {
              _id: e.userId,
            },
          },
        ]),
      );
    });

    setLoad(true);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchMessages();

      return () => setMessages([]);
    }, []),
  );

  const onSend = useCallback((newMessages = []) => {
    newMessages.map(newMessage =>
      MessageApi.store(room.id, {
        message: newMessage.text,
      }),
    );
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>{room.title}</HeaderTitle>
        </HeaderContent>
      </Header>

      <AnnouncementRef
        activeOpacity={0.7}
        style={{
          borderBottomWidth: 0.7,
          borderBottomColor: theme.colors.gray_line_dark,
        }}
      >
        <Image
          source={{
            uri: room.advertisement.first_image.url,
          }}
          resizeMode="cover"
        />
        <Description>
          <Title>{room.advertisement.title}</Title>
          <Price>R$ {room.advertisement.price}/dia</Price>
        </Description>
      </AnnouncementRef>

      <ChatView>
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{ _id: user.id }}
          placeholder="Digite uma mensagem..."
          locale="pt-br"
          dateFormat="LL"
          renderAvatar={null}
          renderBubble={renderBubble}
          showAvatarForEveryMessage
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          // renderChatFooter={renderChatFooter} // Typing === true : activated ? disabled
          textInputStyle={{
            padding: 10,
            fontSize: 18,
            fontFamily: theme.fonts.regular_400,
          }}
          alwaysShowSend
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          parsePatterns={parsePatterns}
        />
      </ChatView>
    </Container>
  );
}
