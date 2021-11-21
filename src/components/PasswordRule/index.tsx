import React from 'react';
import { StyleProp, StyleSheetProperties, TextStyle } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { PasswordRules, Text } from './styles';

interface Props {
  text: string;
  value: string;
  regex: RegExp;
  styleText?: StyleProp<TextStyle>;
}

export default function PasswordRule({ text, value, regex, styleText }: Props) {
  const theme = useTheme();
  const validate: boolean = regex.test(value);

  return (
    <PasswordRules>
      <MaterialIcons
        name={validate ? 'check' : 'close'}
        size={18}
        color={validate ? theme.colors.success_main : theme.colors.error_dark}
      />
      <Text style={styleText}>{text}</Text>
    </PasswordRules>
  );
}
