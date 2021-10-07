import React, { useState } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { InputPassword } from '../../../components/Inputs/InputPassword';
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

export default function SignUpStepTwo() {
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        passwordConfirm: Yup.string()
          .required('Confirmação de senha é obrigatória')
          .test('passwords-match', 'Senhas não correspondem', function (value) {
            return password === value;
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

      const data = { password, passwordConfirm };
      await schema.validate(data);

      // navigation.navigate('SignUpSecondStep', { user: data });
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
            <InputPassword
              iconName="vpn-key"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <InputPassword
              iconName="vpn-key"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <PasswordRules>
            <MaterialIcons
              name="check"
              size={18}
              color={theme.colors.success_main}
            />
            <Text>Mínimo 8 caracteres</Text>
          </PasswordRules>

          <PasswordRules>
            <MaterialIcons
              name="check"
              size={18}
              color={theme.colors.success_main}
            />
            <Text>Caracteres especiais (*&%$#@!)</Text>
          </PasswordRules>

          <PasswordRules>
            <MaterialIcons
              name="check"
              size={18}
              color={theme.colors.success_main}
            />
            <Text>Letras maiúsculas</Text>
          </PasswordRules>

          <PasswordRules>
            <MaterialIcons
              name="check"
              size={18}
              color={theme.colors.success_main}
            />
            <Text>Número</Text>
          </PasswordRules>

          <ButtonForm title="Próximo" onPress={handleRegister} />
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
