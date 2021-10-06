import React, { useState } from 'react';
import { Alert, Keyboard, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Input } from '../../components/Input';
import { InputCpf } from '../../components/InputCpf';
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
  SocialButton,
  TextBtn,
} from './styles';

export default function SignUp() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        identity: Yup.string().required('CPF é obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório.')
          .email('Digite um e-mail válido'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, email, identity };
      await schema.validate(data);

      // Ir para a próxima tela passando os dados do usuário / (prox tela)-> Recuperar informações passadas
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

          <SocialButton activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="google"
              size={24}
              color={theme.colors.green_main}
            />
            <TextBtn>Entrar com conta Google</TextBtn>
          </SocialButton>

          <SocialButton activeOpacity={0.7}>
            <Feather
              name="facebook"
              size={24}
              color={theme.colors.green_main}
            />
            <TextBtn>Entrar com Facebook</TextBtn>
          </SocialButton>
        </Container>
      </TouchableWithoutFeedback>
    </ContainerKeyboardAvoidingView>
  );
}
