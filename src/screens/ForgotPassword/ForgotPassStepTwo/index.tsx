import React, { useState, useRef } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import * as Yup from 'yup';

import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import PasswordApi from '../../../services/api/PasswordApi';
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
  CodeInput,
  ResendCode,
} from './styles';

interface Params {
  user: {
    email: string;
  };
}

export default function ForgotPassStepThree() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params as Params;

  const input_1 = useRef(null);
  const input_2 = useRef(null);
  const input_3 = useRef(null);
  const input_4 = useRef(null);
  const input_5 = useRef(null);
  const input_6 = useRef(null);
  const [value, setValue] = useState('');
  const [value_02, setValue_02] = useState('');
  const [value_03, setValue_03] = useState('');
  const [value_04, setValue_04] = useState('');
  const [value_05, setValue_05] = useState('');
  const [value_06, setValue_06] = useState('');

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    const data = value + value_02 + value_03 + value_04 + value_05 + value_06;

    const code = +data;

    PasswordApi.checkCode({
      code,
      email: user.email,
    })
      .then(() =>
        navigation.dispatch(
          CommonActions.navigate('ForgotPassStepThree', { user }),
        ),
      )
      .catch(error => console.log(error.response));
  }

  function sendCode() {
    PasswordApi.requestResetPassword({
      email: user.email,
    }).catch(error => console.log(error.response));
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
            Agora digite o código que você recebeu por sms em seu celular.
          </Subtitle>

          <Form>
            <CodeInput
              ref={input_1}
              keyboardType="numeric"
              maxLength={1}
              value={value}
              underlineColorAndroid="rgba(0,0,0,0)"
              numberOfLines={1}
              onChangeText={v => {
                setValue(v);
                if (v) input_2.current.focus();
              }}
            />

            <CodeInput
              ref={input_2}
              keyboardType="numeric"
              maxLength={1}
              value={value_02}
              underlineColorAndroid="rgba(0,0,0,0)"
              numberOfLines={1}
              onChangeText={v => {
                setValue_02(v);
                if (v) input_3.current.focus();
              }}
            />

            <CodeInput
              ref={input_3}
              keyboardType="numeric"
              maxLength={1}
              value={value_03}
              underlineColorAndroid="rgba(0,0,0,0)"
              numberOfLines={1}
              onChangeText={v => {
                setValue_03(v);
                if (v) input_4.current.focus();
              }}
            />

            <CodeInput
              ref={input_4}
              keyboardType="numeric"
              maxLength={1}
              value={value_04}
              underlineColorAndroid="rgba(0,0,0,0)"
              numberOfLines={1}
              onChangeText={v => {
                setValue_04(v);
                if (v) input_5.current.focus();
              }}
            />

            <CodeInput
              ref={input_5}
              keyboardType="numeric"
              maxLength={1}
              value={value_05}
              underlineColorAndroid="rgba(0,0,0,0)"
              numberOfLines={1}
              onChangeText={v => {
                setValue_05(v);
                if (v) input_6.current.focus();
              }}
            />

            <CodeInput
              ref={input_6}
              keyboardType="numeric"
              maxLength={1}
              value={value_06}
              underlineColorAndroid="rgba(0,0,0,0)"
              numberOfLines={1}
              onChangeText={v => {
                setValue_06(v);
                if (v) input_6.current.focus();
              }}
            />
          </Form>

          <TouchableOpacity activeOpacity={0.7} onPress={() => sendCode()}>
            <ResendCode>Reenviar código</ResendCode>
          </TouchableOpacity>

          <ButtonForm title="Enviar" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
