import React from 'react';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Welcome: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

// type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;

type WelcomeProps = {
  navigation: WelcomeScreenNavigationProp;
  // route: WelcomeScreenRouteProp;
};

export default function Welcome({ navigation }: WelcomeProps) {
  function handleSignIn() {
    navigation.navigate('SignIn');
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
          onPress={() => navigation.navigate('SignIn')}
        />

        <DivText>
          <Text>Ainda não possui conta?</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SignUp')}
          >
            <LinkCadastro>Cadastre-se agora!</LinkCadastro>
          </TouchableOpacity>
        </DivText>
      </ContainerNextPage>
    </Container>
  );
}
