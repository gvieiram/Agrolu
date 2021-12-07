/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { InputForm } from '../../../components/Inputs/InputForm';
import PasswordRule from '../../../components/PasswordRule';
import PasswordApi from '../../../services/api/PasswordApi';
import { PasswordRegex } from '../../../utils/Regex';
import {
  Container,
  ContainerKeyboardAvoidingView,
  Header,
  BackButton,
  Logo,
  Title,
  Form,
  Label,
  ButtonForm,
  Error,
} from './styles';

interface FormData {
  newPassword: string;
  passwordConfirm: string;
}

interface Params {
  user: {
    email: string;
    code: string;
  };
}

const createSchemaPassword = (
  yup: Yup.StringSchema<string, Record<string, any>, string>,
) => {
  yup = yup.required('Senha é obrigatória');

  PasswordRegex.map(validator => {
    yup = yup.matches(validator.regex, validator.messageError);
  });

  return yup;
};

const schema = Yup.object().shape({
  newPassword: createSchemaPassword(Yup.string()),
  passwordConfirm: Yup.string()
    .required('Senha de confirmação é obrigatória')
    .test('passwords-match', 'Senhas não correspondem', function (value) {
      return this.parent.newPassword === value;
    }),
});

export default function SignUpStepTwo() {
  const theme = useTheme();
  const route = useRoute();
  const { user } = route.params as Params;

  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');

  function handleExchange(form: FormData) {
    const data = {
      password: form.newPassword,
      password_confirmation: form.passwordConfirm,
      code: user.code,
      email: user.email,
    };

    PasswordApi.resetPassword({
      email: user.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      code: data.code,
    })
      .then(() => {
        navigation.dispatch(
          CommonActions.navigate('Confirmation', {
            title: `Senha\nalteada!`,
            message: `Agora você já pode realizar o login!\nEstá esperando o que?`,
            nextScreenRoute: 'SignIn',
            buttonTitle: 'Vamos lá!',
          }),
        );
      })
      .catch(error => console.log(error.response));
  }

  function handleBack() {
    navigation.goBack();
  }

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleConfirmNewPassword = (value: React.SetStateAction<string>) => {
    setValue('newPassword', value);
    setNewPassword(value);
  };

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

          <Form>
            <Label>Para finalizar o processo, digite uma nova senha</Label>
            <InputForm
              inputType="password"
              iconName="vpn-key"
              name="newPassword"
              control={control}
              placeholder="Nova Senha"
              isEditable
              isErrored={errors.newPassword}
              error={errors.newPassword && errors.newPassword.message}
              onChangeText={text => handleConfirmNewPassword(text)}
            />
            {errors.newPassword && (
              <Error>{errors.newPassword && errors.newPassword.message}</Error>
            )}

            <Label>Digite novamente a nova senha</Label>
            <InputForm
              inputType="password"
              iconName="vpn-key"
              name="passwordConfirm"
              control={control}
              placeholder="Repetir Senha"
              isEditable
              isErrored={errors.passwordConfirm}
              error={errors.passwordConfirm && errors.passwordConfirm.message}
              onChangeText={text => setValue('passwordConfirm', text)}
            />
            {errors.passwordConfirm && (
              <Error>
                {errors.passwordConfirm && errors.passwordConfirm.message}
              </Error>
            )}
          </Form>

          {PasswordRegex.map((validator, index) => (
            <PasswordRule
              text={validator.description}
              value={newPassword}
              regex={validator.regex}
              key={index}
            />
          ))}

          <ButtonForm title="Próximo" onPress={handleSubmit(handleExchange)} />
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
