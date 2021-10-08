import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import * as Yup from 'yup';

import { MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { InputForm } from '../../../components/Inputs/InputForm';
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
  PasswordRules,
  Text,
  Error,
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

const passLength = 'Mínimo de 8 caracteres';
const passOneUppercase = 'Pelo menos uma letra maiúscula';
const passOneLowercase = 'Pelo menos uma letra minúscula';
const passOneNumber = 'Pelo menos um número';
const passOneSpecialCharacter = 'Pelo menos um carácter especial ou espaço';

const passConfirmation = 'Senhas não correspondem';

const schema = Yup.object().shape({
  passwordConfirm: Yup.string()
    .required('Senha de confirmação é obrigatória')
    .test('passwords-match', passConfirmation, function (value) {
      return this.parent.password === value;
    }),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(8, passLength)
    .matches(/(?=.*?[A-Z])/, passOneUppercase)
    .matches(/(?=.*?[a-z])/, passOneLowercase)
    .matches(/(?=.*?[0-9])/, passOneNumber)
    .matches(/(?=.*?[#?!@$ %^&*-])/, passOneSpecialCharacter),
});

export default function SignUpStepTwo() {
  const theme = useTheme();
  const navigation = useNavigation();
  // const route = useRoute();
  // const { user } = route.params as Params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleRegister(form: FormData) {
    const data = {
      password: form.password,
      passwordConfirm: form.passwordConfirm,
    };

    // user + data -> enviar pra api e cadastrar

    navigation.dispatch(
      CommonActions.navigate('Confirmation', {
        title: `Sua conta\nfoi criada com\nsucesso!`,
        message: `Falta pouco para você encontrar o que procura!\nEstá esperando o que?`,
        nextScreenRoute: 'SignIn',
        buttonTitle: 'Vamos lá!',
      }),
    );
  }

  const passErrorMessage = errors.password && errors.password.message;

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
            />

            <InputForm
              iconName="vpn-key"
              name="passwordConfirm"
              control={control}
              placeholder="Repetir Senha"
              isErrored={errors.passwordConfirm}
              error={errors.passwordConfirm && errors.passwordConfirm.message}
            />
            {errors.passwordConfirm && (
              <Error>
                {errors.passwordConfirm && errors.passwordConfirm.message}
              </Error>
            )}
          </Form>

          <PasswordRules>
            <MaterialIcons
              name={passErrorMessage === passLength ? 'close' : 'check'}
              size={18}
              color={
                passErrorMessage === passLength
                  ? theme.colors.error_dark
                  : theme.colors.success_main
              }
            />
            <Text>Mínimo 8 caracteres</Text>
          </PasswordRules>

          <PasswordRules>
            <MaterialIcons
              name={passErrorMessage === passOneUppercase ? 'close' : 'check'}
              size={18}
              color={
                passErrorMessage === passOneUppercase
                  ? theme.colors.error_dark
                  : theme.colors.success_main
              }
            />
            <Text>Letra maiúscula</Text>
          </PasswordRules>

          <PasswordRules>
            <MaterialIcons
              name={passErrorMessage === passOneLowercase ? 'close' : 'check'}
              size={18}
              color={
                passErrorMessage === passOneLowercase
                  ? theme.colors.error_dark
                  : theme.colors.success_main
              }
            />
            <Text>Letra minúscula</Text>
          </PasswordRules>

          <PasswordRules>
            <MaterialIcons
              name={passErrorMessage === passOneNumber ? 'close' : 'check'}
              size={18}
              color={
                passErrorMessage === passOneNumber
                  ? theme.colors.error_dark
                  : theme.colors.success_main
              }
            />
            <Text>Número</Text>
          </PasswordRules>

          <PasswordRules>
            <MaterialIcons
              name={
                passErrorMessage === passOneSpecialCharacter ? 'close' : 'check'
              }
              size={18}
              color={
                passErrorMessage === passOneSpecialCharacter
                  ? theme.colors.error_dark
                  : theme.colors.success_main
              }
            />
            <Text>Caracteres especiais (*&%$#@!)</Text>
          </PasswordRules>

          <ButtonForm title="Próximo" onPress={handleSubmit(handleRegister)} />
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
