/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from 'styled-components';

import PasswordRegex from '../../utils/PasswordRegex';
import { InputForm } from '../Inputs/InputForm';
import PasswordRule from '../PasswordRule';
import { Container, Label, Error, ButtonForm } from './styles';

interface FormData {
  password: string;
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
  password: Yup.string().required('Senha é blau'),
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

  function handleRegister(form: FormData) {
    const data = {
      password: form.password,
      newPassword: form.newPassword,
      passwordConfirm: form.passwordConfirm,
    };
  }

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleNewPassword = (value: React.SetStateAction<string>) => {
    setValue('newPassword', value);
    setNewPassword(value);
  };

  const handleConfirmOldPassword = value => {
    // Todo
  };

  return (
    <Container>
      <Label>Digite sua senha antiga</Label>
      <InputForm // Não ta exibindo a mensagem de erro correta
        iconName="vpn-key"
        name="password"
        control={control}
        placeholder="Senha Antiga"
        isErrored={errors.password}
        error={errors.password && errors.password.message}
        onChangeText={text => handleConfirmOldPassword(text)}
      />
      {errors.password && (
        <Error>{errors.password && errors.password.message}</Error>
      )}

      <Label>Agora, digite uma nova senha</Label>
      <InputForm
        iconName="vpn-key"
        name="newPassword"
        control={control}
        placeholder="Nova Senha"
        isErrored={errors.newPassword}
        error={errors.newPassword && errors.newPassword.message}
        onChangeText={text => handleNewPassword(text)}
      />
      {errors.newPassword && (
        <Error>{errors.newPassword && errors.newPassword.message}</Error>
      )}

      <Label>Digite novamente a nova senha</Label>
      <InputForm
        iconName="vpn-key"
        name="passwordConfirm"
        control={control}
        placeholder="Repetir Senha"
        isErrored={errors.passwordConfirm}
        error={errors.passwordConfirm && errors.passwordConfirm.message}
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

      <ButtonForm title="Próximo" onPress={handleSubmit(handleRegister)} />
    </Container>
  );
}
