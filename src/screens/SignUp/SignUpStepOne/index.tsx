import React, { useState } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Input } from '../../../components/Input';
import { InputCpf } from '../../../components/InputCpf';
import { RootStackParamList } from '../../../routes/auth.routes';
import {
  Container,
  ContainerKeyboardAvoidingView,
  Logo,
  Title,
  Subtitle,
  Form,
  ButtonForm,
  LineView,
  Line,
  Text,
  SocialContainer,
  SocialButton,
  IconGoogle,
  IconFacebook,
  ActiveScreen,
  StepOne,
  StepTwo,
} from './styles';

type signInScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

export default function SignUpStepOne() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  const navigation = useNavigation<signInScreenProp>();

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        identity: Yup.string()
          .required('CPF é obrigatório')
          .test(
            'CPF length',
            'CPF deve conter 11 números',
            val => val.length === 14,
          ),
        email: Yup.string()
          .required('E-mail obrigatório.')
          .email('Digite um e-mail válido'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, email, identity };
      await schema.validate(data);

      // Ir para a próxima tela passando os dados do usuário / (prox tela)-> Recuperar informações passadas
      navigation.navigate('SignUpStepTwo');
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
            <Input
              iconName="person"
              placeholder="Nome"
              autoCapitalize="words"
              onChangeText={setName}
              value={name}
            />

            <Input
              iconName="alternate-email"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <InputCpf
              type="cpf"
              iconName="credit-card"
              placeholder="CPF"
              keyboardType="numeric"
              value={identity}
              onChangeText={text => setIdentity(text)}
            />

            <ButtonForm title="Próximo" onPress={handleNextStep} />
          </Form>

          <LineView>
            <Line />
            <Text>ou</Text>
            <Line />
          </LineView>

          <SocialContainer>
            <SocialButton activeOpacity={0.7}>
              <IconGoogle />
            </SocialButton>

            <SocialButton activeOpacity={0.7}>
              <IconFacebook />
            </SocialButton>
          </SocialContainer>
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}