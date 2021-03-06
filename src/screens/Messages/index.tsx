import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from '@react-navigation/native';

import Message from '../../components/Message';
import { Room } from '../../dtos/ChatDTO';
import { RoomResponse } from '../../dtos/response/RoomResponseDTO';
// import { rooms as RoomsRequest } from '../../services/api';
import RoomApi from '../../services/api/RoomApi';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  BackButton,
  Line,
} from './styles';

export function Messages() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  const [rooms, setRooms] = useState<RoomResponse[]>([]);

  const fetchRooms = () => {
    RoomApi.all()
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => console.log(error.response.data));
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRooms();

      return () => setRooms([]);
    }, []),
  );

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
          <>
            <Message data={item} onPress={() => handleChat(item)} />
            <Line />
          </>
        )}
      />
    </Container>
  );
}
