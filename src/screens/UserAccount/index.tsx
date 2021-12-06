import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, Text } from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import AppLoading from 'expo-app-loading';

import { MaterialCommunityIcons as FaceIcon } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { EditAccount } from '../../components/EditAccount';
import ExchangePassword from '../../components/ExchangePassword';
import { UserResponse } from '../../dtos/response/UserResponseDTO';
import { useAuth } from '../../hooks/auth';
import UserApi from '../../services/api/UserApi';
import {
  ContainerKeyboardAvoidingView,
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
  TileOptionSelected,
} from './styles';

export function UserAccount() {
  const navigation = useNavigation();
  const [user, setUser] = useState<UserResponse>(null);
  const theme = useTheme();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit' | 'options'>(
    'options',
  );

  useEffect(() => {
    function getUser() {
      UserApi.me().then(response => setUser(response.data));
    }

    getUser();
  }, []);

  if (!user) {
    return <AppLoading />;
  }

  function handleOptionChange(
    optionSelected: 'dataEdit' | 'passwordEdit' | 'options',
  ) {
    setOption(optionSelected);
  }

  function handleBack() {
    if (option === 'dataEdit' || option === 'passwordEdit') {
      setOption('options');
    } else {
      navigation.goBack();
    }
  }

  const ExchangeOption = () => {
    if (option === 'dataEdit') {
      return (
        <>
          <TileOptionSelected>Dados pessoais</TileOptionSelected>
          <EditAccount />
        </>
      );
    }
    if (option === 'passwordEdit') {
      return (
        <>
          <TileOptionSelected>Alteração de senha</TileOptionSelected>
          <ExchangePassword />
        </>
      );
    }
    return (
      <UserOptions>
        <Card
          activeOpacity={0.7}
          onPress={() => handleOptionChange('dataEdit')}
        >
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
        {user.verified ? null : (
          <Card
            activeOpacity={0.7}
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'UserVerification',
                }),
              )
            }
          >
            <FaceIcon
              name="face-recognition"
              size={32}
              color={theme.colors.green_dark_1}
            />
            <CardText>Verificar documento</CardText>
          </Card>
        )}
        <Card
          activeOpacity={0.7}
          onPress={() => handleOptionChange('passwordEdit')}
        >
          <CardIcon name="vpn-key" size={32} />
          <CardText>Alterar{'\n'}senha</CardText>
        </Card>
      </UserOptions>
    );
  };

  function exchangeTitles() {
    if (option === 'dataEdit') {
      return 'Alterar Conta';
    }
    if (option === 'passwordEdit') {
      return 'Alterar Senha';
    }
    return 'Minha Conta';
  }

  if (!user) {
    return <AppLoading />;
  }

  return (
    <ContainerKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderContent>
              <ButtonBack onPress={handleBack} />
              <HeaderTitle>{exchangeTitles()}</HeaderTitle>
            </HeaderContent>
          </Header>
          <ScrollView showsVerticalScrollIndicator={false}>
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

              <ExchangeOption />
            </AccountContent>
          </ScrollView>
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
