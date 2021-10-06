import React, { useState } from 'react';
import { Alert, Keyboard, Platform, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Yup from 'yup';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { RootStackParamList } from '../../routes/auth.routes';
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

type signInScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<signInScreenProp>();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required('A senha é obrigatória'),
        email: Yup.string()
          .required('E-mail obrigatório.')
          .email('Digite um e-mail válido'),
      });

      await schema.validate({ email, password });

      // Fazer Login
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

            <PasswordInput
              iconName="vpn-key"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              // onPress={() => navigation.navigate('ChangePassword')}
            >
              <TextPassword>Esqueci minha senha</TextPassword>
            </TouchableOpacity>

            <ButtonForm title="Entrar" onPress={handleSignIn} />
          </Form>

          <DivText>
            <Text>Ainda não possui conta?</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('SignUpStepOne')}
            >
              <LinkCadastro>Cadastre-se agora!</LinkCadastro>
            </TouchableOpacity>
          </DivText>
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
