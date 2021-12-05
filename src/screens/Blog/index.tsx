/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { FlatList } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import theme from '../../global/styles/theme';
import {
  Container,
  HeaderContent,
  HeaderTitle,
  ImagePreview,
  ImageBlog,
  BtnContainer,
  Title,
  TextContent,
  Text,
  Description,
  Publication,
} from './styles';

export const Blog = () => {
  const data = [
    {
      key: '1',
      title: 'Blog de dicas',
      iconName: 'comment',
      onPress: () => null,
    },
    {
      key: '2',
      title: 'Sobre a Agrolu',
      iconName: 'info',
      onPress: () => null,
    },
    {
      key: '3',
      title: 'Sair',
      iconName: 'exit-to-app',
      onPress: () => null,
    },
  ];

  const Header = () => {
    return (
      <HeaderContent>
        <HeaderTitle>Blog de dicas Agrolu</HeaderTitle>
      </HeaderContent>
    );
  };

  const Tips = item => {
    return (
      <BtnContainer onPress={item.onPress} activeOpacity={0.7}>
        <ImagePreview>
          {/*
        <ImageBlog /> */}
        </ImagePreview>
        <Description>
          <TextContent>
            <Title numberOfLines={1}>Titulo</Title>
          </TextContent>
          <TextContent>
            <Text numberOfLines={2}>
              Rica em antioxidante: Confira os benefícios de 16 frutas
              vermelhas.
            </Text>
          </TextContent>
          <TextContent>
            <Publication numberOfLines={1}>
              {/* {`${data.created_date} às ${data.created_time}`} */}
              Publicado em
            </Publication>
          </TextContent>
        </Description>
        <MaterialIcons
          name="chevron-right"
          size={28}
          color={theme.colors.green_dark_3}
        />
      </BtnContainer>
    );
  };

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item }) => Tips(item)}
        ListHeaderComponent={() => <Header />}
      />
    </Container>
  );
};
