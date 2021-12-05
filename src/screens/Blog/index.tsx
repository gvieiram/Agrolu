/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import {
  useFocusEffect,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';

import { Load } from '../../components/Load';
import {
  PostResponse,
  PostsResponse,
} from '../../dtos/response/PostResponseDTO';
import theme from '../../global/styles/theme';
import PostApi from '../../services/api/PostApi';
import {
  Container,
  HeaderContent,
  HeaderTitle,
  Thumbnail,
  BtnContainer,
  Title,
  TextContent,
  Text,
  Description,
  Publication,
} from './styles';

export const Blog = () => {
  const navigation = useNavigation();

  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(false);

  function handlePostDetails(id: number) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'PostDetails',
        params: {
          id,
        },
      }),
    );
  }

  const Header = () => {
    return (
      <HeaderContent>
        <HeaderTitle>Blog de dicas Agrolu</HeaderTitle>
      </HeaderContent>
    );
  };

  const Posts = item => {
    return (
      <BtnContainer
        onPress={() => handlePostDetails(item.id)}
        activeOpacity={0.7}
      >
        <Thumbnail source={{ uri: item.thumbnail }} resizeMode="cover" />
        <Description>
          <TextContent>
            <Title numberOfLines={1}>{item.title}</Title>
          </TextContent>
          <TextContent>
            <Text numberOfLines={2}>{item.text}</Text>
          </TextContent>
          <TextContent>
            <Publication numberOfLines={1}>
              {`Publicado em ${item.created_date}`}
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

  useFocusEffect(
    React.useCallback(() => {
      async function getPosts() {
        setLoading(true);

        PostApi.all()
          .then(response => setPosts(response.data))
          .catch(error => console.log(error.response))
          .finally(() => setLoading(false));
      }

      getPosts();

      return () => setPosts([]);
    }, []),
  );

  return (
    <Container>
      {loading ? (
        <Load />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => Posts(item)}
          ListHeaderComponent={Header}
        />
      )}
    </Container>
  );
};
