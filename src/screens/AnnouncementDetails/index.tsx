import React from 'react';
import { ScrollView } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import IconWechat from '../../assets/img/wechat.svg';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import TabBottom from '../../components/TabBottom';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  IconsContainer,
  Like,
  Share,
  AnnouncementTitle,
  AnnouncementContent,
  Price,
  Survey,
  SurveyTitle,
  SurveyIcon,
  Information,
  InformationText,
  PublishedAt,
  Line,
  Description,
  Title,
  DescriptionContent,
  Details,
  Type,
  TitleType,
  DescriptionType,
  Location,
  Advertiser,
  About,
  Name,
  ProfileVerification,
  TextVerified,
  Entered,
  Status,
  StatusText,
} from './styles';

export function AnnouncementDetails() {
  const navigation = useNavigation();

  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  function handleChat() {
    navigation.dispatch(CommonActions.navigate('Chat'));
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>Trator Valtra BM</HeaderTitle>

          <IconsContainer>
            <Like name="favorite-border" size={24} />

            <Share name="ios-share" size={24} />
          </IconsContainer>
        </HeaderContent>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageSlider
          imagesUrl={[
            'https://www.valtra.com.br/content/dam/public/valtra/pt-br/produtos/tratores/a2s/A2S.jpg',
            'https://imagens-cdn.canalrural.com.br/2019/07/valtra01.jpg',
            'https://img.olx.com.br/images/11/113182819977960.jpg',
          ]}
        />

        <AnnouncementContent>
          <AnnouncementTitle>
            Trator Valtra BM - 2019 - Em ótimo estado
          </AnnouncementTitle>
          <Price>R$ 190,00/dia</Price>
          <Survey>
            <SurveyIcon />

            <SurveyTitle>Verificar vistoria</SurveyTitle>
          </Survey>
          <Information>
            <InformationText>Transporte disponível</InformationText>

            <InformationText>Operador disponível</InformationText>
          </Information>
          <PublishedAt>Publicado em 17/09/2021 às 8:45</PublishedAt>
          <Line />
          <Description>
            <Title>Descrição</Title>

            <DescriptionContent>
              Trator Valtra BH 180{'\n'}Ano 2013{'\n'}Horas motor 6.500{'\n'}
              Revisado
            </DescriptionContent>
            <Line />
          </Description>
          <Details>
            <Title>Detalhes</Title>

            <Type>
              <TitleType>Categoria</TitleType>

              <DescriptionType>Máquinas Agrícolas</DescriptionType>
            </Type>

            <Type>
              <TitleType>Tipo</TitleType>

              <DescriptionType>Tratores</DescriptionType>
            </Type>
            <Line />
          </Details>
          <Location>
            <Title>Localização</Title>

            <Type>
              <TitleType>CEP</TitleType>

              <DescriptionType>88180-000</DescriptionType>
            </Type>

            <Type>
              <TitleType>Município</TitleType>

              <DescriptionType>Antônio Carlos</DescriptionType>
            </Type>

            <Type>
              <TitleType>Bairro</TitleType>

              <DescriptionType>Usina</DescriptionType>
            </Type>
            <Line />
          </Location>
          <Title>Anunciante</Title>
          <Advertiser>
            <About>
              <Name>Joaquim Rosa</Name>

              <ProfileVerification>
                <MaterialIcons
                  name="check"
                  size={27}
                  color={theme.colors.success_main}
                />

                <TextVerified>Perfil Verificado</TextVerified>
              </ProfileVerification>
            </About>

            <Entered>Entrou na Agrolu em Fevereiro de 2021</Entered>

            <Status>
              <MaterialIcons
                name="fiber-manual-record"
                size={14}
                color={theme.colors.success_main}
              />

              <StatusText>Online agora</StatusText>
            </Status>
          </Advertiser>
        </AnnouncementContent>
      </ScrollView>
      <TabBottom title="Chat" Icon={IconWechat} onPress={handleChat} />
    </Container>
  );
}
