import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { PasswordRules, Text } from './styles';

interface Props {
  text: string;
  value: string;
  regex: RegExp;
}

export default function PasswordRule({ text, value, regex }: Props) {
  const theme = useTheme();
  const validate: boolean = regex.test(value);

  return (
    <PasswordRules>
      <MaterialIcons
        name={validate ? 'check' : 'close'}
        size={18}
        color={validate ? theme.colors.success_main : theme.colors.error_dark}
      />
      <Text>{text}</Text>
    </PasswordRules>
  );
}
