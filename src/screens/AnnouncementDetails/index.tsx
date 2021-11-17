import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

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
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import AnnouncementApi from '../../services/api/AnnouncementApi';
import RoomApi from '../../services/api/RoomApi';
import UserApi from '../../services/api/UserApi';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  IconsContainer,
  IconLikeOrMore,
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
  MoreContent,
  Option,
  TextOption,
} from './styles';

interface Params {
  ad: AnnouncementResponse;
}

export function AnnouncementDetails(): ReactElement {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { ad } = route.params as Params;

  const [announcement, setAnnouncement] = useState<AnnouncementResponse>(null);
  const [favorite, setFavorite] = useState(false);
  const [boost, setBoost] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  function handleBack() {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Home',
      }),
    );
  }

  async function handleChat() {
    RoomApi.store({
      advertisement_id: announcement.id,
    })
      .then(response =>
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Chat',
            params: {
              room: response.data,
            },
          }),
        ),
      )
      .catch(error => console.log('ERROR', error.response.data));
  }

  function handleBoost() {
    AnnouncementApi.boost(announcement.id)
      .then(() => setBoost(true))
      .catch(error => console.log('ERROR', error.response.data));
  }

  function handleOwnsChat() {
    if (announcement.owns) {
      if (boost) {
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

    return <TabBottom title="Chat" Icon={IconWechat} onPress={handleChat} />;
  }

  function handleFavorite() {
    if (favorite) {
      UserApi.deleteAnnouncementFavorite(announcement.id).then(() => {
        setFavorite(false);
      });
    } else {
      UserApi.storeAnnouncementFavorite(announcement.id).then(() => {
        setFavorite(true);
      });
    }
  }

  useEffect(() => {
    function getAnnouncementById() {
      AnnouncementApi.find(ad.id)
        .then(response => {
          setAnnouncement(response.data);
          setFavorite(response.data.favorite_exists);
          setBoost(response.data.turbo);
        })
        .catch(error => {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
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
              {announcement.owns ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowMoreOptions(!showMoreOptions)}
                >
                  <IconLikeOrMore name="more-vert" size={24} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleFavorite()}>
                  <IconLikeOrMore
                    name={favorite ? 'favorite' : 'favorite-border'}
                    size={24}
                  />
                </TouchableOpacity>
              )}

              <Share name="ios-share" size={24} />
            </IconsContainer>
          </HeaderContent>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          {showMoreOptions ? (
            <MoreContent>
              <Option
                activeOpacity={0.7}
                onPress={() => {
                  navigation.dispatch(
                    CommonActions.navigate({
                      name: 'EditAnnouncement',
                      params: {
                        ad: announcement,
                      },
                    }),
                  );

                  setShowMoreOptions(false);
                }}
              >
                <TextOption>Editar</TextOption>
              </Option>
              <Option
                activeOpacity={0.7}
                // onPress={() => }
              >
                <TextOption>Excluir</TextOption>
              </Option>
            </MoreContent>
          ) : null}

          <ImageSlider imagesUrl={announcement.images} />

          <AnnouncementContent>
            <AnnouncementTitle>{ad.title}</AnnouncementTitle>
            <Price>{`R$ ${ad.price}/dia`}</Price>
            <Survey>
              <SurveyIcon />

              <SurveyTitle>Verificar vistoria</SurveyTitle>
            </Survey>
            <Information>
              {announcement.tags.map(tag => {
                if (tag.has) {
                  return <InformationText>{tag.title}</InformationText>;
                }
              })}
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
        {handleOwnsChat()}
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
