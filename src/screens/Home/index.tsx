import React from 'react';

import { StatusBar } from 'expo-status-bar';

import LogoSvg from '../../assets/img/logoHorizontal.svg';
import Button from '../../components/Button';
import {
  Container,
  ImageBackground,
  DivText,
  Text,
  LinkCadastro,
  Logo,
  ContainerText,
} from './styles';

export default function Home() {
  return (
    <ImageBackground source={require('../../assets/img/imgBackground.png')}>
      <StatusBar style="light" />
      <Container>
        <Logo>
          <LogoSvg />
        </Logo>
        <ContainerText>
          <Button title="Acessar sem cadastro" />
          <DivText>
            <Text>Ainda não tem uma conta?</Text>
            <LinkCadastro
            // onPress={() => {}}  //Link para tela de cadastro
            >
              Cadastre-se!
            </LinkCadastro>
          </DivText>
        </ContainerText>
      </Container>
    </ImageBackground>
  );
}
