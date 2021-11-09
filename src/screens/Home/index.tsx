import React, { useEffect, useState } from 'react';

import { useNavigation, CommonActions } from '@react-navigation/native';

import Announcement from '../../components/Announcement';
import { Load } from '../../components/Load';
import {
  AnnouncementData,
  AnnouncementResponse,
} from '../../dtos/AnnouncementDTO';
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
  TextEndItems,
} from './styles';

export default function Home() {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [endItems, setEndItems] = useState(false);

  useEffect(() => {
    getAnnouncements();
  }, []);

  async function getAnnouncements() {
    try {
      const res = await api.get<AnnouncementResponse>(
        `advertisements?page=${page}`,
      );

      setAnnouncements([...announcements, ...res.data.data]);
      setPage(page + 1);
      setLoading(false);

      if (res.data.next_page_url === null) {
        setEndItems(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function loadMore() {
    if (endItems) {
      return <TextEndItems>Não há mais anúncios</TextEndItems>;
    }
    return <Load />;
  }

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

      {loading ? (
        <Load />
      ) : (
        <AnnouncementList
          data={announcements}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Announcement
              data={item}
              onPress={() => handleAnnouncementDetails(item)}
            />
          )}
          onEndReached={getAnnouncements}
          onEndReachedThreshold={0.1}
          ListFooterComponent={!loading ? loadMore : null}
        />
      )}
    </Container>
  );
}
