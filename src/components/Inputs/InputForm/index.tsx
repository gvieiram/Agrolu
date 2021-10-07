import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { InputPassword } from '../InputPassword';
import { Container, Error } from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
  iconName: React.ComponentProps<typeof MaterialIcons>['name'];
}

export function InputForm({ control, name, iconName, error, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputPassword
            iconName={iconName}
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
