import React, { useEffect, useState } from 'react';

import { useNavigation, CommonActions } from '@react-navigation/native';

import Announcement from '../../components/Announcement';
import { AnnouncementResponse } from '../../interfaces/IAnnouncement';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderContent,
  Search,
  IconsContainer,
  Like,
  Filter,
  Text,
  SearchIcon,
  AnnouncementList,
} from './styles';

export default function Home() {
  const navigation = useNavigation();
  const [announcements, setAnnouncement] = useState([]);

  async function getAnnouncements() {
    const response = await api.get<AnnouncementResponse>('advertisements');
    setAnnouncement(response.data.data);
  }

  function handleAnnouncementDetails(id) {
    navigation.dispatch(CommonActions.navigate('AnnouncementDetails', { id }));
  }

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Search>
            <Text>Procurar</Text>
            <SearchIcon name="search" size={24} />
          </Search>

          <IconsContainer>
            <Like name="favorite-border" size={24} />

            <Filter name="filter-outline" size={24} />
          </IconsContainer>
        </HeaderContent>
      </Header>

      <AnnouncementList
        data={announcements}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => (
          <Announcement
            data={item}
            onPress={() => handleAnnouncementDetails(item.id)}
          />
        )}
      />
    </Container>
  );
}
