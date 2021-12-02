import React, { useState, useRef } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import * as Yup from 'yup';

import { CommonActions, useNavigation } from '@react-navigation/native';

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
} from './styles';

export default function ForgotPassStepThree() {
  const navigation = useNavigation();

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
    console.log(data);

    // todo
    navigation.dispatch(CommonActions.navigate('ForgotPassStepThree'));
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
            Agora digite o código que você recebeu em seu e-mail.
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
          <ButtonForm title="Enviar" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
