import React from 'react';
import { Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Input } from '../../components/Input';
import {
  Container,
  ContainerKeyboardAvoidingView,
  Logo,
  Title,
  Subtitle,
  Form,
  ButtonForm,
  LineView,
  Line,
  Text,
  SocialButton,
  TextBtn,
} from './styles';

export default function SignUp() {
  const theme = useTheme();
  return (
    <ContainerKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Logo />

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>
            Mais de 1.500 máquinas a sua disposição,{'\n'}
            sempre mais próximo de você!
          </Subtitle>

          <Form>
            <Input
              iconName="person"
              placeholder="Nome"
              autoCapitalize="words"
              // onChange={setName}
              // value={name}
            />

            <Input
              iconName="alternate-email"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              // onChange={setEmail}
              // value={email}
            />

            <Input
              iconName="credit-card"
              placeholder="CPF"
              keyboardType="numeric"
              // onChange={setCPF}
              // value={CPF}
            />

            <ButtonForm title="Próximo" />
          </Form>

          <LineView>
            <Line />
            <Text>ou</Text>
            <Line />
          </LineView>

          <SocialButton activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="google"
              size={24}
              color={theme.colors.green_main}
            />
            <TextBtn>Entrar com conta Google</TextBtn>
          </SocialButton>

          <SocialButton activeOpacity={0.7}>
            <Feather
              name="facebook"
              size={24}
              color={theme.colors.green_main}
            />
            <TextBtn>Entrar com Facebook</TextBtn>
          </SocialButton>
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
