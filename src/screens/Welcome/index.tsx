import React from 'react';
import { StatusBar } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import { RFValue } from 'react-native-responsive-fontsize';

import TractorSvg from '../../assets/img/tractor.svg';
import theme from '../../global/styles/theme';
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
        <GradientButton
          gradientBegin="#A2C11C"
          gradientEnd="#2C5D63"
          text="Vamos lá!"
          textStyle={{
            fontSize: 16,
            fontFamily: theme.fonts.medium_500,
          }}
          height={RFValue(50)}
          radius={10}
          impact
          impactStyle="Light"
          // onPressAction={() => alert('Go Home!')}
        />

        <DivText>
          <Text>Ainda não possui conta?</Text>
          <LinkCadastro
          // onPress={() => {}}  //Link para tela de cadastro
          >
            Cadastre-se agora!
          </LinkCadastro>
        </DivText>
      </ContainerNextPage>
    </Container>
  );
}
