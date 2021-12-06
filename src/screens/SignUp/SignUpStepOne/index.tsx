import React, { useState } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import * as Yup from 'yup';

import { CommonActions, useNavigation } from '@react-navigation/native';

import { Input } from '../../../components/Inputs/Input';
import { InputMask } from '../../../components/Inputs/InputMask';
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
  Header,
  BackButton,
} from './styles';

export default function SignUpStepOne() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');
  const [phone, setPhone] = useState('');

  function handleBack() {
    navigation.dispatch(CommonActions.navigate('SignIn'));
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        phone: Yup.string()
          .required('Telefone é obrigatório')
          .test(
            'Phone tests',
            'Telefone deve conter DDD + 9 números',
            val => val.length === 15,
          ),
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

      const data = { name, email, identity, phone };
      await schema.validate(data);

      navigation.dispatch(
        CommonActions.navigate('SignUpStepTwo', { user: data }),
      );
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
          <Header>
            <BackButton onPress={handleBack} />
          </Header>

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
              placeholder="Nome completo"
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

            <InputMask
              type="cpf"
              iconName="credit-card"
              placeholder="CPF"
              maxLength={14}
              keyboardType="numeric"
              value={identity}
              onChangeText={text => setIdentity(text)}
            />

            <InputMask
              type="cel-phone"
              iconName="phone"
              placeholder="Telefone com DDD"
              maxLength={15}
              keyboardType="numeric"
              value={phone}
              onChangeText={text => setPhone(text)}
            />

            <ButtonForm title="Próximo" onPress={handleNextStep} />
          </Form>

          {/* <LineView>
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
          </SocialContainer> */}
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
