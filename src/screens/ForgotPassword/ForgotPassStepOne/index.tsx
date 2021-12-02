import React, { useState } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import * as Yup from 'yup';

import { CommonActions, useNavigation } from '@react-navigation/native';

import { Input } from '../../../components/Inputs/Input';
import {
  Container,
  ContainerKeyboardAvoidingView,
  Header,
  BackButton,
  Logo,
  Title,
  Subtitle,
  Form,
  ButtonForm,
  ResendCode,
} from './styles';

export default function ForgotPassStepOne() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  console.log(email);

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório.')
          .email('Digite um e-mail válido'),
      });

      const data = { email };
      await schema.validate(data);

      navigation.dispatch(
        CommonActions.navigate('ForgotPassStepTwo', { user: email }),
      );
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Erro', error.message);
      }
    }
  }

  return (
    <ContainerKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          {Platform.OS === 'ios' ? (
            <Header>
              <BackButton onPress={handleBack} />
            </Header>
          ) : null}

          <Logo />

          <Title>Recuperação de senha</Title>
          <Subtitle>
            Digite seu e-mail para enviarmos um código de verificação para
            alterar a sua senha.
          </Subtitle>

          <Form>
            <Input
              iconName="alternate-email"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
          </Form>

          <TouchableOpacity
            activeOpacity={0.7}
            // onPress={() =>
            // navigation.dispatch(CommonActions.navigate('ForgotPassStepOne'))
            // }
          >
            <ResendCode>Reenviar código</ResendCode>
          </TouchableOpacity>

          <ButtonForm title="Enviar" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
