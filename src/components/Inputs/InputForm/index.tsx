import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { InputPassword } from '../InputPassword';
import { Container } from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
  isErrored?: boolean;
  iconName: React.ComponentProps<typeof MaterialIcons>['name'];
}

export function InputForm({
  control,
  name,
  iconName,
  isErrored,
  ...rest
}: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputPassword
            iconName={iconName}
            onChangeText={text => onChange(text)}
            value={value}
            isErrored={isErrored}
            {...rest}
          />
        )}
        name={name}
      />
    </Container>
  );
}
