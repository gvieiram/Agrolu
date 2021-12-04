import React, { useEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';

import {
  useFocusEffect,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import axios from 'axios';
import { useTheme } from 'styled-components';

import Announcement from '../../components/Announcement';
import { Load } from '../../components/Load';
import { SearchBar } from '../../components/Search';
import { Params } from '../../dtos/request/AnnouncementRequestDTO';
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
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState<Params>({ page: 1 } as Params);
  const [endItems, setEndItems] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleChangeParams = (name, value) => {
    setParams(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // async function getAnnouncements(isPaginate = false) {
  //   AnnouncementApi.all(params)
  //     .then(response => {
  //       if (isPaginate) {
  //         setAnnouncements([...announcements, ...response.data.data]);
  //       } else {
  //         setAnnouncements(response.data.data);
  //       }

  //       if (response.data.next_page_url === null) {
  //         handleChangeParams('page', params.page);
  //         setEndItems(true);
  //       } else {
  //         handleChangeParams('page', params.page + 1);
  //         setEndItems(false);
  //       }
  //     })
  //     .catch(error => console.log(error.response))
  //     .finally(() => setLoading(false));
  // }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    setAnnouncements([]);
    setParams({ page: 1 });

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
    setAnnouncements([]);
    handleChangeParams('page', 1);
    handleChangeParams('name', s);
  };

  const handleEndReached = () => {
    if (!endItems) {
      handleChangeParams('page', params.page + 1);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      async function getAnnouncements() {
        setLoading(true);

        AnnouncementApi.all(params)
          .then(response => {
            setAnnouncements([...announcements, ...response.data.data]);

            if (response.data.next_page_url === null) {
              setEndItems(true);
            } else {
              setEndItems(false);
            }
          })
          .catch(error => console.log(error.response))
          .finally(() => setLoading(false));
      }

      getAnnouncements();

      return () => {
        setAnnouncements([]);
        axios.CancelToken.source().cancel();
      };
    }, [params.name, params.page]),
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <SearchBar
            platform="ios"
            placeholder="Procurar"
            onCancel={() => setParams({ page: 1 })}
            onChangeText={text => handleSearch(text)}
            value={params.name}
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
          onEndReached={handleEndReached}
          onEndReachedThreshold={0}
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
