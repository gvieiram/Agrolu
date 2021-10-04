import React from 'react';
import { Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import { Input } from '../../components/Input';
import {
  Container,
  Logo,
  Title,
  Subtitle,
  Form,
  ButtonForm,
  TextPassword,
  DivText,
  Text,
  LinkCadastro,
} from './styles';

export default function SignIn() {
  const theme = useTheme();
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Logo />

        <Title>Faça seu login</Title>
        <Subtitle>
          Se você ja faz parte da família Agrolu, faça{'\n'}
          seu login e utilize todas as ferramentas disponíveis
        </Subtitle>

        <Form>
          <Input
            iconName="alternate-email"
            iconColor={theme.colors.green_dark}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            // onChange={setEmail}
            // value={email}
          />

          <Input
            iconName="vpn-key"
            iconColor={theme.colors.green_dark}
            placeholder="Senha"
            autoCorrect={false}
            // onChange={setPassword}
            // value={password}
          />

          <TextPassword>Esqueci minha senha</TextPassword>
          <ButtonForm title="Entrar" />
        </Form>

        <DivText>
          <Text>Ainda não possui conta?</Text>
          <LinkCadastro
          // onPress={() => navigation.navigate('Cadastro')}
          >
            Cadastre-se agora!
          </LinkCadastro>
        </DivText>
      </TouchableWithoutFeedback>
    </Container>
  );
}
