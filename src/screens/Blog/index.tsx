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

  const [posts, setPosts] = useState<PostsResponse[]>([]);
  const [endItems, setEndItems] = useState(false);
  const [loading, setLoading] = useState(false);

  function handlePostDetails(post: PostResponse) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'PostDetails',
        params: {
          post,
        },
      }),
    );
  }

  const data = [
    {
      id: 1,
      title: 'Sementes crioulas',
      text: 'A Epagri está promovendo um curso on-line para propiciar um espaçode valorização e incentivo à preservação e às trocas de sementes crioulas. A capacitação será feita em quatro etapas e a próxima será na quinta-feira, 30 de julho, quando vai abordar a tecnologia de produção dessas sementes e as relações entre guardiões e o ensino. O curso é gratuito e direcionado aos guardiões de sementes, agricultores, estudantes e técnicos.\n\nSementes crioulas são aquelas tradicionais, ou seja, que foram mantidas e selecionadas por várias décadas através dos agricultores tradicionais do mundo todo e que não possuem restrição para a sua multiplicação. A coordenadora do curso, extensionista Rose Gerber, ressalta que a essas sementes protegem o meio ambiente e promovem a soberania alimentar e economia na propriedade rural, além de preservar a cultura dos povos originários. “As sementes crioulas guardam a natureza das nossas terras. Preservar e multiplicar essas riquezas ancestrais de alto material genético é o grande desafio dos guardiões de sementes”, afirma.',
      thumbnail:
        'https://www.epagri.sc.gov.br/wp-content/uploads/2020/07/sementes-crioulas-epagri.jpg',
      reference: 'https://bityli.com/JjBcBI',
    },
    {
      id: 2,
      title: 'Sementes crioulas',
      text: 'A Epagri está promovendo um curso on-line para propiciar um espaçode valorização e incentivo à preservação e às trocas de sementes crioulas. A capacitação será feita em quatro etapas e a próxima será na quinta-feira, 30 de julho, quando vai abordar a tecnologia de produção dessas sementes e as relações entre guardiões e o ensino. O curso é gratuito e direcionado aos guardiões de sementes, agricultores, estudantes e técnicos.\n\nSementes crioulas são aquelas tradicionais, ou seja, que foram mantidas e selecionadas por várias décadas através dos agricultores tradicionais do mundo todo e que não possuem restrição para a sua multiplicação. A coordenadora do curso, extensionista Rose Gerber, ressalta que a essas sementes protegem o meio ambiente e promovem a soberania alimentar e economia na propriedade rural, além de preservar a cultura dos povos originários. “As sementes crioulas guardam a natureza das nossas terras. Preservar e multiplicar essas riquezas ancestrais de alto material genético é o grande desafio dos guardiões de sementes”, afirma.',
      thumbnail:
        'https://www.epagri.sc.gov.br/wp-content/uploads/2020/07/sementes-crioulas-epagri.jpg',
      reference: 'https://bityli.com/JjBcBI',
    },
  ];

  const Header = () => {
    return (
      <HeaderContent>
        <HeaderTitle>Blog de dicas Agrolu</HeaderTitle>
      </HeaderContent>
    );
  };

  const Posts = (item: PostResponse) => {
    return (
      <BtnContainer onPress={() => handlePostDetails(item)} activeOpacity={0.7}>
        <Thumbnail source={{ uri: item.thumbnail }} resizeMode="cover" />
        <Description>
          <TextContent>
            <Title numberOfLines={1}>{item.title}</Title>
          </TextContent>
          <TextContent>
            <Text numberOfLines={3}>{item.text}</Text>
          </TextContent>
          <TextContent>
            {/* <Publication numberOfLines={1}>
              {`Publicado em ${item.created_date}`}
            </Publication> */}
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
          data={data} // Data setado pra teste, correto: data={data}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => Posts(item)}
          ListHeaderComponent={Header}
        />
      )}
    </Container>
  );
};
