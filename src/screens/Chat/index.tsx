import React, { useEffect, useState, useCallback } from 'react';
import { LogBox } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import 'dayjs/locale/pt-br';

import { useNavigation } from '@react-navigation/native';
import Echo from 'laravel-echo';
import _ from 'lodash';
import Pusher from 'pusher-js/react-native';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
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

export function Chat() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { token, user } = useAuth();
  const [load, setLoad] = useState(false);

  function handleBack() {
    navigation.goBack();
  }

  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const response = await api.get('rooms/1/messages');

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
      authEndpoint: 'http://3.131.152.29/broadcasting/auth',
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
      authEndpoint: 'http://3.131.152.29/broadcasting/auth',
    });
    broadcast.private('chat.1').listen('MessageSent', e => {
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

  useEffect(() => {
    fetchMessages();
  }, []);

  const onSend = useCallback((newMessages = []) => {
    newMessages.map(newMessage => {
      api.post('rooms/1/messages', {
        message: newMessage.text,
      });
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>{user.name}</HeaderTitle>
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
            uri: 'https://www.valtra.com.br/content/dam/public/valtra/pt-br/produtos/tratores/a2s/A2S.jpg',
          }}
          resizeMode="cover"
        />
        <Description>
          <Title>Trator Valtra BM</Title>
          <Price>R$ 190,00/dia</Price>
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
