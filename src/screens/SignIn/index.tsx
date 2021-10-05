import React from 'react';
import { Keyboard, Platform, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'styled-components';

import { Input } from '../../components/Input';
import { RootStackParamList } from '../../routes/auth.routes';
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

type signInScreenProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

export default function SignIn() {
  const theme = useTheme();

  const navigation = useNavigation<signInScreenProp>();

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

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
          <ButtonForm
            title="Entrar"
            // onPress={() => navigation.navigate('Home')}
          />
        </Form>

        <DivText>
          <Text>Ainda não possui conta?</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SignUp')}
          >
            <LinkCadastro>Cadastre-se agora!</LinkCadastro>
          </TouchableOpacity>
        </DivText>
      </TouchableWithoutFeedback>
    </Container>
  );
}
