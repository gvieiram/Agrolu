import React from 'react';

import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';

import ButtonGradient from '../../components/ButtonGradient';
import { Container, Logo, Title, Subtitle } from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
  buttonTitle: string;
}

export default function Confirmation() {
  const navigation = useNavigation();
  const route = useRoute();

  const { title, message, nextScreenRoute, buttonTitle } =
    route.params as Params;

  function handleConfirm() {
    navigation.dispatch(CommonActions.navigate(nextScreenRoute));
  }

  return (
    <Container>
      <Logo />

      <Title>{title}</Title>

      <Subtitle>{message}</Subtitle>

      <ButtonGradient title={buttonTitle} onPress={handleConfirm} />
    </Container>
  );
}
