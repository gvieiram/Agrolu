import React, { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';

import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Announcement from '../../components/Announcement';
import { Load } from '../../components/Load';
import { SearchBar } from '../../components/Search';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import AnnouncementApi from '../../services/api/AnnouncementApi';
import { convertToSlug } from '../../utils/Regex';
import {
  Container,
  Header,
  HeaderContent,
  IconsContainer,
  Like,
  Filter,
  AnnouncementList,
  TextEndItems,
} from './styles';

const wait = (timeout: number) => {
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
  const [originalData, setOriginalData] = useState<AnnouncementResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [endItems, setEndItems] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAnnouncements();
  }, []);

  async function getAnnouncements() {
    AnnouncementApi.all({
      page,
    })
      .then(response => {
        setAnnouncements([...announcements, ...response.data.data]);
        setOriginalData([...originalData, ...response.data.data]);
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

  const handleSearch = (s: string) => {
    const text = convertToSlug(s).toLowerCase();
    const arr: AnnouncementResponse[] = JSON.parse(
      JSON.stringify(originalData),
    );

    setAnnouncements(
      arr.filter(data =>
        convertToSlug(data.title).toLowerCase().includes(text),
      ),
    );
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <SearchBar
            platform="ios"
            placeholder="Procurar"
            onChangeText={text => {
              setSearch(text);
              handleSearch(text);
            }}
            value={search}
          />

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
              visitorsActive
              iconActive
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
