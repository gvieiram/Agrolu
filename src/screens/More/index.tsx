import React from 'react';
import { FlatList, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  BackButton,
} from './styles';

export function More() {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>Mais</HeaderTitle>
        </HeaderContent>
      </Header>

      <FlatList
        data={[
          { key: 'Blog de dicas', onPress: () => null },
          { key: 'Sobre a Agrolu', onPress: () => null },
          { key: 'Sair', onPress: () => signOut() },
        ]}
        renderItem={({ item }) => (
          <Button title={item.key} onPress={item.onPress} />
        )}
      />
    </Container>
  );
}
