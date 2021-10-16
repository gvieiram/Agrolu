import React from 'react';
import { ScrollView } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import ButtonGradient from '../../components/ButtonGradient';
import { Container, Image, TextImage, CountImage, Title } from './styles';

export function AddAnnouncement() {
  const theme = useTheme();
  return (
    <Container>
      <ScrollView>
        <Image activeOpacity={0.7}>
          <MaterialIcons
            name="add-a-photo"
            size={32}
            color={theme.colors.green_dark_3}
          />
          <TextImage>Adicionar Fotos</TextImage>
          <CountImage>0 / 6 Fotos</CountImage>
        </Image>

        <Title>Título do Anúncio *</Title>

        <Title>Descrição *</Title>

        <Title>Categoria *</Title>

        <Title>Tipo *</Title>

        <ButtonGradient title="Anunciar já" />
      </ScrollView>
    </Container>
  );
}
