import React from 'react';
import { Keyboard, Platform, StatusBar, StyleSheet } from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Input } from '../../components/Input';
import {
  Container,
  Logo,
  Title,
  Subtitle,
  Form,
  ButtonForm,
  Social,
  LineView,
  Line,
  Text,
  SocialButton,
  TextBtn,
} from './styles';

export default function SignUp() {
  const theme = useTheme();
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Logo />

        <Title>Crie sua{'\n'}conta</Title>
        <Subtitle>
          Mais de 1.500 máquinas a sua disposição,{'\n'}
          sempre mais próximo de você!
        </Subtitle>

        <ScrollView>
          <Form>
            <Input
              iconName="user"
              iconColor={theme.colors.green_dark}
              placeholder="Nome"
              autoCapitalize="words"
              // onChange={setName}
              // value={name}
            />

            <Input
              iconName="mail"
              iconColor={theme.colors.green_dark}
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              // onChange={setEmail}
              // value={email}
            />

            <Input
              iconName="credit-card"
              iconColor={theme.colors.green_dark}
              placeholder="CPF"
              keyboardType="numeric"
              // onChange={setCPF}
              // value={CPF}
            />

            <ButtonForm title="Próximo" />
          </Form>
        </ScrollView>

        <Social>
          <LineView>
            <Line />
            <Text>ou</Text>
            <Line />
          </LineView>

          <SocialButton>
            <MaterialCommunityIcons
              name="google"
              size={24}
              color={theme.colors.green_main}
            />
            <TextBtn>Entrar com conta Google</TextBtn>
          </SocialButton>

          <SocialButton>
            <Feather
              name="facebook"
              size={24}
              color={theme.colors.green_main}
            />
            <TextBtn>Entrar com Facebook</TextBtn>
          </SocialButton>
        </Social>
      </TouchableWithoutFeedback>
    </Container>
  );
}
