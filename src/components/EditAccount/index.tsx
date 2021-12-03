/* eslint-disable object-shorthand */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import AppLoading from 'expo-app-loading';

import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from 'styled-components';

import { UpdateRequest } from '../../dtos/request/UserRequestDTO';
import { CityResponse } from '../../dtos/response/CityResponseDTO';
import { StatesResponse } from '../../dtos/response/StateResponseDTO';
import { UserResponse } from '../../dtos/response/UserResponseDTO';
import CityApi from '../../services/api/CityApi';
import StateApi from '../../services/api/StateApi';
import UserApi from '../../services/api/UserApi';
import AlertError from '../AlertError';
import { Checkbox } from '../Checkbox';
import { InputForm } from '../Inputs/InputForm';
import { InputPicker } from '../Inputs/InputPicker';
import { Container, Label, Error, ButtonForm, Title } from './styles';

export function EditAccount() {
  const theme = useTheme();
  const [user, setUser] = useState<UserResponse>(null);
  const [cities, setCities] = useState<CityResponse[]>([]);
  const [states, setStates] = useState<StatesResponse[]>([]);
  const [stateSelected, setStateSelected] = useState(null);
  const { control } = useForm();

  const handleChange = (name, value) => {
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleEditAccount() {
    const {
      email,
      phone,
      cep,
      city_id,
      public_place,
      complement,
      number,
      receive_notification,
    } = user;

    UserApi.update({
      email,
      phone,
      cep,
      city_id,
      public_place,
      complement,
      number,
      receive_notification: receive_notification ? 1 : 0,
    }).catch(error => AlertError(error));
  }

  function getCitiesByState(stateId: number) {
    StateApi.find(stateId).then(response => setCities(response.data.cities));
  }

  function getStates() {
    StateApi.all().then(response => {
      setStates(response.data);

      if (user.city) {
        setStateSelected(user.city.state_id);
        getCitiesByState(user.city.state_id);
      }
    });
  }

  function getProfile() {
    UserApi.me().then(response => {
      const { data } = response;
      setUser(data);
      getStates();
    });
  }

  useEffect(() => {
    getProfile();

    return () => setUser(null);
  }, []);

  if (!user) {
    return <AppLoading />;
  }

  return (
    <Container>
      <Label>Nome Completo</Label>
      <InputForm
        inputType="text"
        name="name"
        control={control}
        isEditable={false}
        onChangeText={text => handleChange('name', text)}
        value={user.name}
      />

      <Label>CPF</Label>
      <InputForm
        inputType="withMask"
        maskType="cpf"
        name="document"
        control={control}
        placeholder="CPF"
        keyboardType="numeric"
        isEditable={false}
        onChangeText={text => handleChange('document', text)}
        value={user.document}
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
        value={user.email}
        onChangeText={text => {
          handleChange('email', text);
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
        value={user.phone}
        onChangeText={text => {
          handleChange('phone', text);
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
        value={user.cep}
        onChangeText={text => {
          handleChange('cep', text);
        }}
      />

      <Label>Estado</Label>
      <InputPicker
        labelDisable="Selecione um Estado"
        selectedValue={stateSelected}
        items={
          states
            ? states.map(item => {
                return { label: item.name, value: item.id };
              })
            : []
        }
        onValueChange={value => {
          setStateSelected(value);
          getCitiesByState(Number(value));
        }}
      />

      <Label>Cidade</Label>
      <InputPicker
        labelDisable="Selecione uma Cidade"
        selectedValue={user.city_id}
        items={
          cities
            ? cities.map(item => {
                return { label: item.name, value: item.id };
              })
            : []
        }
        onValueChange={value => {
          handleChange('city_id', value);
        }}
      />

      <Label>Rua</Label>
      <InputForm
        inputType="text"
        name="public_place"
        control={control}
        isEditable
        onChangeText={text => {
          handleChange('public_place', text);
        }}
        value={user.public_place}
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
        value={user.number}
        onChangeText={text => {
          handleChange('number', text);
        }}
      />

      <Label>Complemento</Label>
      <InputForm
        inputType="text"
        name="complement"
        control={control}
        isEditable
        placeholder="Casa, Apartamento"
        value={user.complement}
        maxLength={60}
        onChangeText={text => {
          handleChange('complement', text);
        }}
      />

      <Title>Notificações</Title>
      <Checkbox
        text="Quero receber notificações com dicas de colheita"
        style={{ marginTop: 20 }}
        textStyle={{ color: theme.colors.green_dark_main, fontSize: 15 }}
        status={user.receive_notification ? 'checked' : 'unchecked'}
        onPress={() =>
          handleChange('receive_notification', !user.receive_notification)
        }
      />

      <ButtonForm title="Salvar Alterações" onPress={handleEditAccount()} />
    </Container>
  );
}
