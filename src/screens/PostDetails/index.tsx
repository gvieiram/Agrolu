/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';

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
  ImagePreview,
  ImageBlog,
  BtnContainer,
  Title,
  TextContent,
  Text,
  Description,
  Publication,
} from './styles';

export function PostDetails() {
  const navigation = useNavigation();

  const [posts, setPosts] = useState<PostsResponse[]>([]);
  const [endItems, setEndItems] = useState(false);
  const [loading, setLoading] = useState(false);

  function handlePostDetails(post: PostResponse) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AnnouncementDetails',
        params: {
          post,
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
      <BtnContainer onPress={() => handlePostDetails(item)} activeOpacity={0.7}>
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
              {/* {`Publicado em ${item.created_date}`} */}
              Publicado em ...
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

  useEffect(() => {
    async function getPosts() {
      setLoading(true);

      PostApi.all()
        .then(response => {
          console.log(response.data.data);
          setPosts([...posts, ...response.data.data]); // Erro pq o array ta vazio (Eu acho)

          if (response.data.next_page_url === null) {
            setEndItems(true);
          } else {
            setEndItems(false);
          }
        })
        .catch(error => console.log(error.response))
        .finally(() => setLoading(false));
    }

    getPosts();
  }, []);

  return (
    <Container>
      {loading ? (
        <Load />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => Posts(item)}
          ListHeaderComponent={Header}
        />
      )}
    </Container>
  );
}
