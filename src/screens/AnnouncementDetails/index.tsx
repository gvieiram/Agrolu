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
import { AnnouncementData, Image } from '../../dtos/AnnouncementDTO';
import { Room } from '../../dtos/ChatDTO';
import api from '../../services/api';
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

  const [announcement, setAnnouncement] = useState<AnnouncementData>(null);

  function handleBack() {
    navigation.goBack();
  }

  function handleChat() {
    api
      .post('rooms', {
        advertisement_id: announcement.id,
      })
      .then(response => {
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Chat',
            params: {
              room: response.data,
            },
          }),
        );
      })
      .catch(error => {
        console.log('ERROR', error.response);
      });
  }

  function handleBoost() {
    api.post(`advertisements/${announcement.id}/boost`);
  }

  function handleOwns() {
    if (announcement.owns) {
      return <TabBottom title="Chat" Icon={IconWechat} onPress={handleChat} />;
    }

    if (announcement.turbo) {
      return <TabBottom title="Anúncio turbinado" Icon={IconWechat} />;
    }

    return (
      <TabBottom
        title="Turbinar anúncio"
        Icon={IconWechat}
        onPress={handleBoost}
      />
    );
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

  if (announcement) {
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
          <ImageSlider imagesUrl={announcement.images} />

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

              <DescriptionContent>
                {announcement.description}
              </DescriptionContent>
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

              <Entered>{`Entrou na Agrolu em ${announcement.advertiser.created_date}`}</Entered>

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
        {handleOwns()}
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />
        </HeaderContent>
      </Header>
    </Container>
  );
}
