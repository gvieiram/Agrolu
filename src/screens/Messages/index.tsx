import React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  BackButton,
  MessagesContainer,
  Image,
  AnnouncementTitle,
} from './styles';

export function Messages() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  const mockMessages = [
    {
      id: 1,
      firstAnnouncementImage:
        'https://www.valtra.com.br/content/dam/public/valtra/pt-br/produtos/tratores/a2s/A2S.jpg',
      AnnouncementTitle: 'Trator Valtra BM',
      messageTime: '4 mins atrás',
      userName: 'John Doe',
      message: 'Também quero alugar esse trator!! 🚜',
    },
    {
      id: 2,
      firstAnnouncementImage:
        'https://www.valtra.com.br/content/dam/public/valtra/pt-br/produtos/tratores/a2s/A2S.jpg',
      AnnouncementTitle: 'Trator Valtra BM',
      messageTime: '2 horas atrás',
      userName: 'Jenny Doe',
      message: 'Quero alugar esse trator!! 🚜',
    },
    {
      id: 3,
      firstAnnouncementImage:
        'https://www.valtra.com.br/content/dam/public/valtra/pt-br/produtos/tratores/a2s/A2S.jpg',
      AnnouncementTitle: 'Trator Valtra BM',
      messageTime: '1 dia atrás',
      userName: 'Oliver Doe',
      message: 'Esse trator é meu!! 🚜',
    },
  ];

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>Chats</HeaderTitle>
        </HeaderContent>
      </Header>

      <FlatList
        data={mockMessages}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <MessagesContainer>
            <Image source={{ uri: item.firstAnnouncementImage }} />
            <AnnouncementTitle>{item.AnnouncementTitle}</AnnouncementTitle>
            <Text>{item.userName}</Text>
          </MessagesContainer>
        )}
      />
    </Container>
  );
}
