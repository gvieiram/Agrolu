import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import AnnouncementSwipe from '../../components/AnnouncementSwipe';
import { Load } from '../../components/Load';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
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

export default function AnnouncementSaved() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [announcements, setAnnouncements] = useState<AnnouncementResponse[]>(
    [],
  );
  const [refreshing, setRefreshing] = React.useState(false);
  const [handleSwipe, setHandleSwipe] = useState(false);

  function handleBack() {
    navigation.goBack();
  }

  async function getAnnouncements() {
    UserApi.myAnnouncementsFavorites()
      .then(response => setAnnouncements(response.data))
      .catch(error => console.log(error.response));
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    getAnnouncements();

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const unFavoriteRow = rowKey => {
    const newData = [...announcements];
    const prevIndex = announcements.findIndex(item => item.id === rowKey);
    newData.splice(prevIndex, 1);

    UserApi.deleteAnnouncementFavorite(rowKey);
    setAnnouncements(newData);
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
          <HeaderTitle>Anúncios salvos</HeaderTitle>
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
                  onPress={() => unFavoriteRow(data.item.id)}
                >
                  <MaterialIcons
                    name="favorite"
                    size={36}
                    color={theme.colors.green_main}
                  />
                </TouchableOpacity>
              </HiddenItemContainer>
            );
          }}
          rightOpenValue={-75}
          disableRightSwipe
          onRightActionStatusChange={isActivated =>
            setHandleSwipe(isActivated.isActivated)
          }
        />
      ) : (
        <Load />
      )}
    </Container>
  );
}
