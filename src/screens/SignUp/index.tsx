import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  Container,
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

export default function SignUp() {
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
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

          <Social>
            <LineView>
              <Line />
              <Text>ou</Text>
              <Line />
            </LineView>

            <SocialButton>
              <MaterialCommunityIcons name="google" size={24} color="#a0bf1d" />
              <TextBtn>Entrar com conta Google</TextBtn>
            </SocialButton>

            <SocialButton>
              <Feather name="facebook" size={24} color="#a0bf1d" />
              <TextBtn>Entrar com Facebook</TextBtn>
            </SocialButton>
          </Social>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
