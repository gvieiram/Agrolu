import React, { useEffect } from 'react';

import { useNavigation, CommonActions } from '@react-navigation/native';

import { Announcement } from '../../components/Announcement';
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

  const announcementData = {
    description: 'Trator Valtra BM',
    price: 190.0,
    publication: 'Antônio Carlos - Hoje às 8:45',
    status: 'Disponível',
    thumbnail:
      'https://www.valtra.com.br/content/dam/public/valtra/pt-br/produtos/tratores/a2s/A2S.jpg',
  };

  function handleAnnouncementDetails() {
    navigation.dispatch(CommonActions.navigate('AnnouncementDetails'));
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
        data={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21,
          22, 23, 24, 25,
        ]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => (
          <Announcement
            data={announcementData}
            onPress={handleAnnouncementDetails}
          />
        )}
      />
    </Container>
  );
}
