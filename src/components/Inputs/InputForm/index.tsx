import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { TextInputMaskTypeProp } from 'react-native-masked-text';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { InputPassword } from '../InputPassword';
import { Container, InputText, InputMask } from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
  isErrored?: boolean;
  inputType: 'password' | 'text' | 'withMask' | 'combobox';
  isEditable: boolean;
  iconName?: React.ComponentProps<typeof MaterialIcons>['name'];
  maskType?: TextInputMaskTypeProp;
}

export function InputForm({
  control,
  name,
  iconName,
  isErrored,
  inputType,
  maskType,
  isEditable,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => {
          if (inputType === 'password') {
            return (
              <InputPassword
                iconName={iconName}
                onChangeText={text => onChange(text)}
                value={value}
                isErrored={isErrored}
                {...rest}
              />
            );
          }
          if (inputType === 'text') {
            return (
              <InputText
                onChangeText={text => onChange(text)}
                value={value}
                isEditable={isEditable}
                editable={isEditable}
                {...rest}
              />
            );
          }
          if (inputType === 'withMask') {
            return (
              <InputMask
                type={maskType}
                onChangeText={text => onChange(text)}
                value={value}
                isEditable={isEditable}
                editable={isEditable}
                {...rest}
              />
            );
          }
        }}
        name={name}
      />
    </Container>
  );
}
