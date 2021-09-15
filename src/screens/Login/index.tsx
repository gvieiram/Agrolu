import React from 'react';
import { StatusBar } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  Container,
  ContainerLogin,
  Logo,
  Title,
  Subtitle,
  Form,
  Social,
  LineView,
  Line,
  Text,
  SocialButton,
  TextBtn,
} from './styles';

export default function Login() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ContainerLogin>
        <Logo />
        <Title>Crie sua{'\n'}conta</Title>
        <Subtitle>
          Mais de 1.500 máquinas a sua disposição,{'\n'}
          sempre mais próximo de você!
        </Subtitle>
        <Form>
          <Input
            iconName="user"
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="words"
          />

          <Input
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <Input
            iconName="credit-card"
            placeholder="CPF"
            keyboardType="number-pad"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Form>
        <Button title="Próximo" />
      </ContainerLogin>

      <Social>
        <LineView>
          <Line />
          <Text>ou</Text>
          <Line />
        </LineView>

        <SocialButton>
          <TextBtn>Entrar com conta Google</TextBtn>
        </SocialButton>
      </Social>
    </Container>
  );
}
