/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from 'styled-components';

import UserApi from '../../services/api/UserApi';
import { PasswordRegex } from '../../utils/Regex';
import { InputForm } from '../Inputs/InputForm';
import PasswordRule from '../PasswordRule';
import { Container, Label, Error, ButtonForm } from './styles';

interface FormData {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

const createSchemaPassword = (
  yup: Yup.StringSchema<string, Record<string, any>, string>,
) => {
  yup = yup.required('Senha é obrigatória');

  PasswordRegex.map(validator => {
    yup = yup.matches(validator.regex, validator.messageError);
  });

  return yup;
};

const schema = Yup.object().shape({
  oldPassword: Yup.string().required('Senha é obrigatória'),
  newPassword: createSchemaPassword(Yup.string()),
  passwordConfirm: Yup.string()
    .required('Senha de confirmação é obrigatória')
    .test('passwords-match', 'Senhas não correspondem', function (value) {
      return this.parent.newPassword === value;
    }),
});

export default function ExchangePassword() {
  const theme = useTheme();
  const [newPassword, setNewPassword] = useState('');

  function handleExchange(form: FormData) {
    const data = {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
      passwordConfirm: form.passwordConfirm,
    };

    UserApi.resetMyPassword({
      current_password: data.oldPassword,
      password: data.newPassword,
      password_confirmation: data.passwordConfirm,
    })
      .then(() => Alert.alert('Senha Alterada!'))
      .catch(error => console.log(error.response));
  }

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleConfirmNewPassword = (value: React.SetStateAction<string>) => {
    setValue('newPassword', value);
    setNewPassword(value);
  };

  return (
    <Container>
      <Label>Digite sua senha antiga</Label>
      <InputForm
        inputType="password"
        iconName="vpn-key"
        name="password"
        control={control}
        placeholder="Senha Antiga"
        isEditable
        isErrored={errors.oldPassword}
        error={errors.oldPassword && errors.oldPassword.message}
        onChangeText={text => setValue('oldPassword', text)}
      />
      {errors.oldPassword && (
        <Error>{errors.oldPassword && errors.oldPassword.message}</Error>
      )}

      <Label>Agora, digite uma nova senha</Label>
      <InputForm
        inputType="password"
        iconName="vpn-key"
        name="newPassword"
        control={control}
        placeholder="Nova Senha"
        isEditable
        isErrored={errors.newPassword}
        error={errors.newPassword && errors.newPassword.message}
        onChangeText={text => handleConfirmNewPassword(text)}
      />
      {errors.newPassword && (
        <Error>{errors.newPassword && errors.newPassword.message}</Error>
      )}

      <Label>Digite novamente a nova senha</Label>
      <InputForm
        inputType="password"
        iconName="vpn-key"
        name="passwordConfirm"
        control={control}
        placeholder="Repetir Senha"
        isEditable
        isErrored={errors.passwordConfirm}
        error={errors.passwordConfirm && errors.passwordConfirm.message}
        onChangeText={text => setValue('passwordConfirm', text)}
      />
      {errors.passwordConfirm && (
        <Error>
          {errors.passwordConfirm && errors.passwordConfirm.message}
        </Error>
      )}

      {PasswordRegex.map((validator, index) => (
        <PasswordRule
          text={validator.description}
          value={newPassword}
          regex={validator.regex}
          key={index}
          styleText={{ color: theme.colors.green_dark_main }}
        />
      ))}

      <ButtonForm title="Alterar" onPress={handleSubmit(handleExchange)} />
    </Container>
  );
}
