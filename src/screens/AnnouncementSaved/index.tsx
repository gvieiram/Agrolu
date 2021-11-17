import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';

import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Announcement from '../../components/Announcement';
import { BackButton } from '../../components/BackButton';
import { Load } from '../../components/Load';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import UserApi from '../../services/api/UserApi';
import {
  Container,
  Header,
  HeaderContent,
  AnnouncementList,
  HeaderTitle,
} from './styles';

export default function AnnouncementSaved() {
  const navigation = useNavigation();

  const [announcements, setAnnouncements] = useState<AnnouncementResponse[]>(
    [],
  );

  function handleBack() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Home',
      }),
    );
  }

  async function getAnnouncements() {
    UserApi.myAnnouncementsFavorites()
      .then(response => setAnnouncements(response.data))
      .catch(error => console.log(error.response));
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

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>Anúncios salvos</HeaderTitle>
        </HeaderContent>
      </Header>

      {announcements ? (
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
        />
      ) : (
        <Load />
      )}
    </Container>
  );
}
