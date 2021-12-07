/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import * as Linking from 'expo-linking';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { PostResponse } from '../../dtos/response/PostResponseDTO';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  BackButton,
  Content,
  TitleContainer,
  TitlePost,
  Publication,
  Thumbnail,
  TextContent,
  Text,
  LinkTitle,
  LinkText,
} from './styles';

interface Params {
  post: PostResponse;
}

export function PostDetails() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { post } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  const handleNavigateToLink = () => {
    Linking.openURL(post.reference);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />
          <HeaderTitle>Blog</HeaderTitle>
        </HeaderContent>
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <TitleContainer>
            <TitlePost numberOfLines={2}>{post.title}</TitlePost>
          </TitleContainer>
          {/* <Publication>Publicado em ...</Publication> */}
          <Thumbnail
            source={{
              uri: post.thumbnail,
            }}
            resizeMode="cover"
          />
          <TextContent>
            <Text>{post.text}</Text>
          </TextContent>
          <LinkTitle>Link para acesso ao material de referência</LinkTitle>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleNavigateToLink()}
          >
            <LinkText>{post.reference}</LinkText>
          </TouchableOpacity>
        </Content>
      </ScrollView>
    </Container>
  );
}
