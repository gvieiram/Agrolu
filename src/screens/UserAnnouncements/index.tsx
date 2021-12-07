import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Bolt from '../../assets/img/bolt.svg';
import AnnouncementSwipe from '../../components/Announcement';
import { Load } from '../../components/Load';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import AnnouncementApi from '../../services/api/AnnouncementApi';
import UserApi from '../../services/api/UserApi';
import {
  Container,
  Header,
  HeaderContent,
  AnnouncementList,
  HeaderTitle,
  ButtonBack,
  HiddenItemContainer,
} from './styles';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function UserAnnouncements() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [announcements, setAnnouncements] = useState<AnnouncementResponse[]>(
    [],
  );
  const [refreshing, setRefreshing] = React.useState(false);

  function handleBack() {
    navigation.goBack();
  }

  async function getAnnouncements() {
    UserApi.myAnnouncements()
      .then(response => setAnnouncements(response.data))
      .catch(error => console.log(error.response));
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    getAnnouncements();

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const deleteAnnouncement = rowID => {
    const newData = [...announcements];
    const prevIndex = announcements.findIndex(item => item.id === rowID);

    AnnouncementApi.destroy(rowID)
      .then(() => {
        newData.splice(prevIndex, 1);
        setAnnouncements(newData);
      })
      .catch(error => console.log(error.response.data || error.message));
  };

  const boostAnnouncement = item => {
    try {
      AnnouncementApi.boost(item.id).then(() => {
        getAnnouncements();
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

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
          <ButtonBack onPress={handleBack} />
          <HeaderTitle>Meus anúncios</HeaderTitle>
        </HeaderContent>
      </Header>

      {announcements ? (
        <AnnouncementList
          data={announcements}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <AnnouncementSwipe
              data={item}
              onPress={() => handleAnnouncementDetails(item)}
              onLongPress={e => e}
              iconActive={item.turbo}
              visitorsActive
              cardSlider
            />
          )}
          onEndReached={getAnnouncements}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.green_linear_dark_opaque}
              colors={[theme.colors.green_linear_dark_opaque]}
            />
          }
          renderHiddenItem={data => {
            return (
              <HiddenItemContainer>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => deleteAnnouncement(data.item.id)}
                >
                  <MaterialIcons
                    name="delete"
                    size={36}
                    color={theme.colors.error_light_2}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    boostAnnouncement(data.item);
                  }}
                >
                  <Bolt width={36} height={36} fill={theme.colors.green_main} />
                </TouchableOpacity>
              </HiddenItemContainer>
            );
          }}
          rightOpenValue={-75}
          leftOpenValue={75}
        />
      ) : (
        <Load />
      )}
    </Container>
  );
}
