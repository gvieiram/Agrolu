import React, { useState } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import * as Yup from 'yup';

import { CommonActions, useNavigation } from '@react-navigation/native';

import { Input } from '../../components/Inputs/Input';
import { InputPassword } from '../../components/Inputs/InputPassword';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  ContainerKeyboardAvoidingView,
  Logo,
  Title,
  Subtitle,
  Bold,
  Form,
  ButtonForm,
  TextPassword,
  DivText,
  Text,
  LinkCadastro,
} from './styles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const navigation = useNavigation();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required('A senha é obrigatória'),
        email: Yup.string()
          .required('E-mail obrigatório.')
          .email('Digite um e-mail válido'),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Erro', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credencias',
        );
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

          <Title>Faça seu login</Title>
          <Subtitle>
            Se você ja faz parte da <Bold>família Agrolu</Bold>, faça{'\n'}
            seu <Bold>login</Bold> e utilize todas as ferramentas disponíveis
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

            <InputPassword
              iconName="vpn-key"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.dispatch(CommonActions.navigate('ForgotPassStepOne'))
              }
            >
              <TextPassword>Esqueci minha senha</TextPassword>
            </TouchableOpacity>

            <ButtonForm title="Entrar" onPress={handleSignIn} />
          </Form>

          <DivText>
            <Text>Ainda não possui conta?</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.dispatch(CommonActions.navigate('SignUpStepOne'))
              }
            >
              <LinkCadastro>Cadastre-se agora!</LinkCadastro>
            </TouchableOpacity>
          </DivText>
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
