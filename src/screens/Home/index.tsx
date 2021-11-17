import React, { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';

import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Announcement from '../../components/Announcement';
import { Load } from '../../components/Load';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import api from '../../services/api';
import AnnouncementApi from '../../services/api/AnnouncementApi';
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

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function Home() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [announcements, setAnnouncements] = useState<AnnouncementResponse[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [endItems, setEndItems] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getAnnouncements();
  }, []);

  async function getAnnouncements() {
    AnnouncementApi.all({
      page,
    })
      .then(response => {
        setAnnouncements([...announcements, ...response.data.data]);
        setPage(page + 1);

        if (response.data.next_page_url === null) {
          setEndItems(true);
        } else {
          setEndItems(false);
        }
      })
      .catch(error => console.log(error.response))
      .finally(() => setLoading(false));
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    getAnnouncements();

    wait(2000).then(() => setRefreshing(false));
  }, []);

  function loadMore() {
    if (endItems) {
      return <TextEndItems>Não há mais anúncios</TextEndItems>;
    }
    return <Load />;
  }

  function handleAnnouncementDetails(ad: AnnouncementResponse) {
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
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'AnnouncementSaved',
                  }),
                )
              }
            >
              <Like name="favorite-border" size={24} />
            </TouchableOpacity>

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.green_linear_dark_opaque}
              colors={[theme.colors.green_linear_dark_opaque]}
            />
          }
        />
      )}
    </Container>
  );
}
