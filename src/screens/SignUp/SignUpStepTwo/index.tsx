import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import * as Yup from 'yup';

import { MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
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
} from './styles';

interface FormData {
  password: string;
  passwordConfirm: string;
}

const schema = Yup.object().shape({
  passwordConfirm: Yup.string()
    .required('Confirmação de senha é obrigatória')
    .test('passwords-match', 'Senhas não correspondem', function (value) {
      return this.parent.password === value;
    }),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(8, 'Mínimo de 8 caracteres')
    .matches(/(?=.*?[A-Z])/, 'Pelo menos uma letra maiúscula')
    .matches(/(?=.*?[a-z])/, 'Pelo menos uma letra minúscula')
    .matches(/(?=.*?[0-9])/, 'Pelo menos um número')
    .matches(
      /(?=.*?[#?!@$ %^&*-])/,
      'Pelo menos um carácter especial ou espaço',
    ),
});

export default function SignUpStepTwo() {
  const theme = useTheme();

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

    console.log(data);
  }

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
              error={errors.password && errors.password.message}
            />

            <InputForm
              iconName="vpn-key"
              name="passwordConfirm"
              control={control}
              placeholder="Repetir Senha"
              error={errors.passwordConfirm && errors.passwordConfirm.message}
            />
          </Form>

          <PasswordRules>
            <MaterialIcons
              name={errors.password && errors.password.type ? 'close' : 'check'}
              size={18}
              color={
                errors.password && errors.password.type
                  ? theme.colors.error_dark
                  : theme.colors.success_main
              }
            />
            <Text>Mínimo 8 caracteres</Text>
          </PasswordRules>

          <PasswordRules>
            <MaterialIcons
              name={errors.password && errors.password.type ? 'close' : 'check'}
              size={18}
              color={
                errors.password && errors.password.type
                  ? theme.colors.error_dark
                  : theme.colors.success_main
              }
            />
            <Text>Caracteres especiais (*&%$#@!)</Text>
          </PasswordRules>

          <PasswordRules>
            <MaterialIcons
              name={errors.password && errors.password.type ? 'close' : 'check'}
              size={18}
              color={
                errors.password && errors.password.type
                  ? theme.colors.error_dark
                  : theme.colors.success_main
              }
            />
            <Text>Letras maiúsculas</Text>
          </PasswordRules>

          <PasswordRules>
            <MaterialIcons
              name={errors.password && errors.password.type ? 'close' : 'check'}
              size={18}
              color={
                errors.password && errors.password.type
                  ? theme.colors.error_dark
                  : theme.colors.success_main
              }
            />
            <Text>Número</Text>
          </PasswordRules>

          <ButtonForm title="Próximo" onPress={handleSubmit(handleRegister)} />
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
