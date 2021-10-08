import React from 'react';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CommonActions, useNavigation } from '@react-navigation/native';

import TractorSvg from '../../assets/img/tractor.svg';
import ButtonGradient from '../../components/ButtonGradient';
import {
  Container,
  BackgroundImage,
  BackgroundImageRadial,
  Tractor,
  Title,
  Subtitle,
  SubtitleBold,
  ContainerNextPage,
  DivText,
  Text,
  LinkCadastro,
} from './styles';

export default function Welcome() {
  const navigation = useNavigation();

  function handleSignIn() {
    navigation.dispatch(CommonActions.navigate('SignIn'));
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <BackgroundImage source={require('../../assets/img/background.png')} />
      <BackgroundImageRadial
        source={require('../../assets/img/radialBackground.png')}
      />

      <Tractor>
        <TractorSvg />
      </Tractor>

      <Title>
        Encontre o que{'\n'}
        você procura
      </Title>

      <Subtitle>
        Aqui você
        <SubtitleBold> encontra</SubtitleBold> e
        <SubtitleBold> anuncia</SubtitleBold> o
        <SubtitleBold> maquinário</SubtitleBold> ou
        <SubtitleBold> implemento </SubtitleBold>
        que precisa, ou que está parado.
      </Subtitle>

      <ContainerNextPage>
        <ButtonGradient
          title="Vamos lá!"
          onPress={() => navigation.dispatch(CommonActions.navigate('SignIn'))}
        />

        <DivText>
          <Text>Ainda não possui conta?</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.dispatch(CommonActions.navigate('SignUpStepOne'))
            }
          >
            <LinkCadastro>Cadastre-se agora!</LinkCadastro>
          </TouchableOpacity>
        </DivText>
      </ContainerNextPage>
    </Container>
  );
}
