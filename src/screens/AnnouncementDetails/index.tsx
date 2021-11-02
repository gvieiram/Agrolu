import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useTheme } from 'styled-components';

import IconWechat from '../../assets/img/wechat.svg';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import TabBottom from '../../components/TabBottom';
import { AnnouncementData } from '../../dtos/AnnouncementDTO';
import api from '../../Services/api';
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

interface Params {
  ad: AnnouncementData;
}

export function AnnouncementDetails(): ReactElement {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { ad } = route.params as Params;

  const [announcement, setAnnouncement] = useState<AnnouncementData>({
    advertiser: {},
    type: {
      category: {},
    },
  } as AnnouncementData);

  function handleBack() {
    navigation.goBack();
  }

  function handleChat() {
    navigation.dispatch(CommonActions.navigate('Chat'));
  }

  useEffect(() => {
    async function getAnnouncementById() {
      const response = await api.get<AnnouncementData>(
        `advertisements/${ad.id}`,
      );
      setAnnouncement(response.data);
    }

    getAnnouncementById();
  }, [ad.id]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>
            {ad.title.length >= 25 ? `${ad.title.slice(0, 22)}...` : ad.title}
          </HeaderTitle>

          <IconsContainer>
            <Like name="favorite-border" size={24} />

            <Share name="ios-share" size={24} />
          </IconsContainer>
        </HeaderContent>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageSlider
          imagesUrl={[
            {
              id: 'Img_1',
              photo:
                'https://www.valtra.com.br/content/dam/public/valtra/pt-br/produtos/tratores/a2s/A2S.jpg',
            },
            {
              id: 'Img_2',
              photo:
                'https://imagens-cdn.canalrural.com.br/2019/07/valtra01.jpg',
            },
            {
              id: 'Img_3',
              photo: 'https://img.olx.com.br/images/11/113182819977960.jpg',
            },
          ]}
        />

        <AnnouncementContent>
          <AnnouncementTitle>{ad.title}</AnnouncementTitle>
          <Price>{`R$ ${ad.price}/dia`}</Price>
          <Survey>
            <SurveyIcon />

            <SurveyTitle>Verificar vistoria</SurveyTitle>
          </Survey>
          <Information>
            <InformationText>Transporte disponível</InformationText>

            <InformationText>Operador disponível</InformationText>
          </Information>
          <PublishedAt>
            {`Publicado em ${ad.created_date} às ${ad.created_time}`}
          </PublishedAt>
          <Line />
          <Description>
            <Title>Descrição</Title>

            <DescriptionContent>{announcement.description}</DescriptionContent>
            <Line />
          </Description>
          <Details>
            <Title>Detalhes</Title>

            <Type>
              <TitleType>Categoria</TitleType>

              <DescriptionType>
                {announcement.type.category.name}
              </DescriptionType>
            </Type>

            <Type>
              <TitleType>Tipo</TitleType>

              <DescriptionType>{announcement.type.name}</DescriptionType>
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
              <Name>{announcement.advertiser.name}</Name>

              {announcement.advertiser.verified ? (
                <ProfileVerification>
                  <MaterialIcons
                    name="check"
                    size={27}
                    color={theme.colors.success_main}
                  />

                  <TextVerified>Perfil Verificado</TextVerified>
                </ProfileVerification>
              ) : (
                <ProfileVerification>
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={theme.colors.error_main}
                  />

                  <TextVerified>Perfil Não Verificado</TextVerified>
                </ProfileVerification>
              )}
            </About>

            <Entered>{`Entrou na Agrolu em ${announcement.advertiser.created_at}`}</Entered>

            <Status>
              <MaterialIcons
                name="fiber-manual-record"
                size={14}
                color={
                  theme.colors.success_main
                  // user.status
                  //   ? theme.colors.success_main
                  //   : theme.colors.gray_line_dark
                }
              />

              <StatusText>
                Online
                {/* {user.status ? 'Online' : 'Offline'} */}
              </StatusText>
            </Status>
          </Advertiser>
        </AnnouncementContent>
      </ScrollView>
      <TabBottom title="Chat" Icon={IconWechat} onPress={handleChat} />
    </Container>
  );
}
