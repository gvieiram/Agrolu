/* eslint-disable no-shadow */
import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

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

export function Chat() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hoje eu acordei todo Nicolas Cagezinho',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Dianho',
          avatar:
            'https://portalrva.com.br/wp-content/uploads/2020/12/dianho.jpeg',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>Joaquim Rosa</HeaderTitle>
        </HeaderContent>
      </Header>

      <AnnouncementRef>
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
          onSend={messages => onSend(messages)}
          user={{ _id: 1 }}
          infiniteScroll
        />
      </ChatView>
    </Container>
  );
}
