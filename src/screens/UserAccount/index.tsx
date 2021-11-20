import React from 'react';

import { MaterialCommunityIcons as FaceIcon } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  ButtonBack,
  AccountContent,
  User,
  ImageWrapper,
  UserIconWrapper,
  UserImageIcon,
  UserImage,
  UserName,
  Line,
  UserOptions,
  Card,
  CardIcon,
  CardText,
} from './styles';

export function UserAccount() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <ButtonBack onPress={handleBack} />
          <HeaderTitle>Minha Conta</HeaderTitle>
        </HeaderContent>
      </Header>

      <AccountContent>
        <User>
          <ImageWrapper>
            {user.photo ? (
              <UserImage source={{ uri: user.photo }} />
            ) : (
              <UserIconWrapper>
                <UserImageIcon name="account-circle" />
              </UserIconWrapper>
            )}
          </ImageWrapper>
          <UserName>{user.name}</UserName>
        </User>

        <Line />

        <UserOptions>
          <Card activeOpacity={0.7}>
            <CardIcon name="edit" size={32} />
            <CardText>Editar perfil</CardText>
          </Card>

          <Card
            activeOpacity={0.7}
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'UserAnnouncements',
                }),
              )
            }
          >
            <CardIcon name="folder-shared" size={32} />
            <CardText>Meus anúncios</CardText>
          </Card>

          <Card
            activeOpacity={0.7}
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'AnnouncementSaved',
                }),
              )
            }
          >
            <CardIcon name="favorite" size={32} />
            <CardText>Anúncios favoritos</CardText>
          </Card>

          <Card activeOpacity={0.7}>
            <FaceIcon
              name="face-recognition"
              size={32}
              color={theme.colors.green_dark_1}
            />
            <CardText>Verificar documento</CardText>
          </Card>

          <Card activeOpacity={0.7}>
            <CardIcon name="edit" size={32} />
            <CardText>Alterar{'\n'}senha</CardText>
          </Card>
        </UserOptions>
      </AccountContent>
    </Container>
  );
}
