import React from 'react';

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
  const announcementData = {
    description: 'Trator Valtra BM',
    price: 190.0,
    publication: 'Antônio Carlos - Hoje às 8:45',
    status: 'Disponível',
    thumbnail: 'https://imagens-cdn.canalrural.com.br/2019/07/valtra01.jpg',
  };

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
        renderItem={({ item }) => <Announcement data={announcementData} />}
      />
    </Container>
  );
}
