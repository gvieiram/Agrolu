/* eslint-disable object-shorthand */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from 'styled-components';

import { CityResponse } from '../../dtos/response/CityResponseDTO';
import UserApi from '../../services/api/UserApi';
import { Checkbox } from '../Checkbox';
import { InputForm } from '../Inputs/InputForm';
import { InputPicker } from '../Inputs/InputPicker';
import { Container, Label, Error, ButtonForm, Title } from './styles';

interface FormData {
  name: string;
  identity: string;
  email: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement: string;
}

export function EditAccount() {
  const theme = useTheme();
  const [name, setName] = useState('Gustavo');
  const [cpf, setCpf] = useState('073.338.777-99');
  const [email, setEmail] = useState('agrolu@teste.com');
  const [phone, setPhone] = useState('(48) 98445-9898');
  const [cep, setCep] = useState('88065999');
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState('Rua Estou Com Fome');
  const [number, setNumber] = useState('239');
  const [complement, setComplement] = useState('Do lado da rua Hambúrguer');
  const [notification, setNotification] = useState(false);

  const [cities, setCities] = useState<CityResponse[]>([]);
  const [states, setStates] = useState<CityResponse[]>([]);

  const {
    setValue,
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm(); // { resolver: yupResolver(schema) }

  function handleEditAccount(form: FormData) {
    const data = {
      name: form.name,
      cpf: form.identity,
      email: form.email,
      cep: form.cep,
      estate: state,
      city: city,
      street: form.street,
      number: form.number,
      complement: form.complement,
      notification: notification ? '1' : '0',
    };

    console.log([data]);

    // UserApi.resetMyPassword({
    //   current_password: data.oldPassword,
    //   password: data.newPassword,
    //   password_confirmation: data.passwordConfirm,
    // })
    //   .then(() => Alert.alert('Senha Alterada!'))
    //   .catch(error => console.log(error.response));
  }

  useEffect(() => {
    setValue('name', name);
    setValue('identity', cpf);
    setValue('email', email);
    setValue('phone', phone);
    setValue('cep', cep);
    // setValue('state', state);
    // setValue('city', city);
    setValue('street', street);
    setValue('number', number);
    setValue('complement', complement);
  }, []);

  return (
    <Container>
      <Label>Nome Completo</Label>
      <InputForm
        inputType="text"
        name="name"
        control={control}
        isEditable={false}
        defaultValue={name}
      />

      <Label>CPF</Label>
      <InputForm
        inputType="withMask"
        maskType="cpf"
        name="identity"
        control={control}
        placeholder="CPF"
        keyboardType="numeric"
        isEditable={false}
        defaultValue={cpf}
      />

      <Label>E-mail</Label>
      <InputForm
        inputType="text"
        name="email"
        control={control}
        placeholder="agrolu@agrolu.com"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        isEditable
        defaultValue={email}
        onChangeText={text => {
          setValue('email', text);
          setEmail(text);
        }}
      />

      <Label>Telefone</Label>
      <InputForm
        inputType="withMask"
        maskType="cel-phone"
        name="phone"
        control={control}
        placeholder="(11) 98999-9999"
        keyboardType="numeric"
        maxLength={15}
        isEditable
        defaultValue={phone}
        onChangeText={text => {
          setValue('phone', text);
          setPhone(text);
        }}
      />

      <Title>Endereço</Title>

      <Label>CEP</Label>
      <InputForm
        inputType="withMask"
        maskType="zip-code"
        name="cep"
        control={control}
        placeholder="99999-999"
        keyboardType="numeric"
        isEditable
        maxLength={9}
        defaultValue={cep}
        onChangeText={text => {
          setValue('cep', text);
          setCep(text);
        }}
      />

      <Label>Estado</Label>
      <InputPicker
        labelDisable="Selecione um Estado"
        defaultValue={state}
        items={
          states
            ? states.map(s => {
                return { label: s.name, value: s.id };
              })
            : []
        }
        onValueChange={value => {
          setState(value);
        }}
      />

      <Label>Cidade</Label>
      <InputPicker
        labelDisable="Selecione uma Cidade"
        defaultValue={city}
        items={
          cities
            ? cities.map(c => {
                return { label: c.name, value: c.id };
              })
            : []
        }
        onValueChange={value => {
          setCity(value);
        }}
      />

      <Label>Rua</Label>
      <InputForm
        inputType="text"
        name="street"
        control={control}
        isEditable={false}
        defaultValue={street}
      />

      <Label>Número</Label>
      <InputForm
        inputType="text"
        name="number"
        control={control}
        keyboardType="numeric"
        maxLength={5}
        isEditable
        placeholder="123"
        defaultValue={number}
        onChangeText={text => {
          setValue('number', text);
          setNumber(text);
        }}
      />

      <Label>Complemento</Label>
      <InputForm
        inputType="text"
        name="complement"
        control={control}
        isEditable
        placeholder="Casa, Apartamento"
        defaultValue={complement}
        maxLength={60}
        onChangeText={text => {
          setValue('complement', text);
          setComplement(text);
        }}
      />

      <Title>Notificações</Title>
      <Checkbox
        text="Quero receber notificações com dicas de colheita"
        style={{ marginTop: 20 }}
        textStyle={{ color: theme.colors.green_dark_main, fontSize: 15 }}
        status={notification ? 'checked' : 'unchecked'}
        onPress={() => setNotification(!notification)}
      />

      <ButtonForm
        title="Salvar Alterações"
        onPress={handleSubmit(handleEditAccount)}
      />
    </Container>
  );
}
