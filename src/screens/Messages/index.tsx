import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import { useNavigation, CommonActions } from '@react-navigation/native';

import Message from '../../components/Message';
import { Room } from '../../dtos/ChatDTO';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  BackButton,
} from './styles';

export function Messages() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  const [rooms, setRooms] = useState<Room[]>([]);

  const fetcRooms = async () => {
    api
      .get<Room>('rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    fetcRooms();
  }, []);

  function handleChat(room: Room) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Chat',
        params: {
          room,
        },
      }),
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>Chats</HeaderTitle>
        </HeaderContent>
      </Header>

      <FlatList
        data={rooms}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Message
            data={item}
            // onPress={() => handleChat(item)}
          />
        )}
      />
    </Container>
  );
}
