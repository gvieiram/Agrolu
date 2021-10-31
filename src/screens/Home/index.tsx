import React, { useEffect, useState } from 'react';

import { useNavigation, CommonActions } from '@react-navigation/native';

import Announcement from '../../components/Announcement';
import {
  AnnouncementData,
  AnnouncementResponse,
} from '../../dtos/AnnouncementDTO';
import api from '../../Services/api';
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
  const [announcements, setAnnouncement] = useState<AnnouncementData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAnnouncements() {
      try {
        const res = await api.get<AnnouncementResponse>('advertisements');
        setAnnouncement(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getAnnouncements();
  }, [announcements]);

  function handleAnnouncementDetails(ad: AnnouncementData) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AnnouncementDetails',
        params: {
          ad,
        },
      }),
    );
  }

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
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Announcement
            data={item}
            onPress={() => handleAnnouncementDetails(item)}
          />
        )}
      />
    </Container>
  );
}
