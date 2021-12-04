import React from 'react';
import { FlatList, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  BackButton,
  Content,
  Title,
  BtnContainer,
  Description,
} from './styles';

export function More() {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  function handleBack() {
    navigation.goBack();
  }

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
      onPress: () => signOut(),
    },
  ];

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>Mais</HeaderTitle>
        </HeaderContent>
      </Header>

      <FlatList
        data={data}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <BtnContainer onPress={item.onPress} activeOpacity={0.7}>
            <Content>
              <Description>
                <MaterialIcons
                  name={item.iconName}
                  size={24}
                  color={theme.colors.green_dark_1}
                />
                <Title>{item.title}</Title>
              </Description>

              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.green_dark_1}
              />
            </Content>
          </BtnContainer>
        )}
      />
    </Container>
  );
}
