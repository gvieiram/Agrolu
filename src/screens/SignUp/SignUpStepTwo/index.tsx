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

import AlertError from '../../../components/AlertError';
import { InputForm } from '../../../components/Inputs/InputForm';
import PasswordRule from '../../../components/PasswordRule';
import api from '../../../services/api';
import {
  Container,
  ContainerKeyboardAvoidingView,
  Logo,
  Title,
  Subtitle,
  Form,
  ButtonForm,
  ActiveScreen,
  StepOne,
  StepTwo,
  Error,
  Header,
  BackButton,
} from './styles';

interface FormData {
  password: string;
  passwordConfirm: string;
}

interface Params {
  user: {
    name: string;
    email: string;
    identity: string;
  };
}

interface Validator {
  description: string;
  messageError: string;
  regex: RegExp;
}

const validators: Array<Validator> = [
  {
    description: 'Mínimo 8 caracteres',
    messageError: 'Mínimo de 8 caracteres',
    regex: /^.{8,}$/,
  },
  {
    description: 'Letra maiúscula',
    messageError: 'Pelo menos uma letra maiúscula',
    regex: /(?=.*?[A-Z])/,
  },
  {
    description: 'Letra minúscula',
    messageError: 'Pelo menos uma letra minúscula',
    regex: /(?=.*?[a-z])/,
  },
  {
    description: 'Número',
    messageError: 'Pelo menos um número',
    regex: /(?=.*?[0-9])/,
  },
  {
    description: 'Caracteres especiais (*&%$#@!)',
    messageError: 'Pelo menos um carácter especial ou espaço',
    regex: /(?=.*?[#?!@$ %^&*-])/,
  },
];

const createSchemaPassword = (
  yup: Yup.StringSchema<string, Record<string, any>, string>,
) => {
  yup = yup.required('Senha é obrigatória');

  validators.map(validator => {
    yup = yup.matches(validator.regex, validator.messageError);
  });

  return yup;
};

const schema = Yup.object().shape({
  password: createSchemaPassword(Yup.string()),
  passwordConfirm: Yup.string()
    .required('Senha de confirmação é obrigatória')
    .test('passwords-match', 'Senhas não correspondem', function (value) {
      return this.parent.password === value;
    }),
});

export default function SignUpStepTwo() {
  const navigation = useNavigation();
  const [password, SetPassword] = useState('');
  const route = useRoute();
  const { user } = route.params as Params;

  function handleBack() {
    navigation.dispatch(CommonActions.navigate('SignUpStepOne'));
  }

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handlePassword = (value: React.SetStateAction<string>) => {
    setValue('password', value);
    SetPassword(value);
  };

  async function handleRegister(form: FormData) {
    const data = {
      password: form.password,
      passwordConfirm: form.passwordConfirm,
    };

    await api
      .post('/auth/register', {
        name: user.name,
        email: user.email,
        document: user.identity,
        password: data.password,
      })
      .then(() => {
        navigation.dispatch(
          CommonActions.navigate('Confirmation', {
            title: `Sua conta\nfoi criada com\nsucesso!`,
            message: `Falta pouco para você encontrar o que procura!\nEstá esperando o que?`,
            nextScreenRoute: 'SignIn',
            buttonTitle: 'Vamos lá!',
          }),
        );
      })
      .catch(error => AlertError(error));
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

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>
            Mais de 1.500 máquinas a sua disposição,{'\n'}
            sempre mais próximo de você!
          </Subtitle>

          <ActiveScreen>
            <StepOne>Dados Pessoais</StepOne>

            <StepTwo>Senha de acesso</StepTwo>
          </ActiveScreen>

          <Form>
            <InputForm
              iconName="vpn-key"
              name="password"
              control={control}
              placeholder="Senha"
              isErrored={errors.password}
              error={errors.password && errors.password.message}
              onChangeText={text => handlePassword(text)}
              inputType="password"
              isEditable
            />

            <InputForm
              iconName="vpn-key"
              name="passwordConfirm"
              control={control}
              placeholder="Repetir Senha"
              isErrored={errors.passwordConfirm}
              error={errors.passwordConfirm && errors.passwordConfirm.message}
              inputType="password"
              isEditable
            />
            {errors.passwordConfirm && (
              <Error>
                {errors.passwordConfirm && errors.passwordConfirm.message}
              </Error>
            )}
            {errors.password && (
              <Error>{errors.password && errors.password.message}</Error>
            )}
          </Form>

          {validators.map((validator, index) => (
            <PasswordRule
              text={validator.description}
              value={password}
              regex={validator.regex}
              key={index}
            />
          ))}

          <ButtonForm title="Próximo" onPress={handleSubmit(handleRegister)} />
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
