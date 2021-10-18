import React, { useState, useRef } from 'react';
import { CheckBoxProps, StyleProp, ViewStyle } from 'react-native';
import { Checkbox as Check } from 'react-native-paper';

import { useTheme } from 'styled-components';

import { Container, Text } from './styles';

interface Props extends CheckBoxProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

export function Checkbox({ text, style, ...rest }: Props) {
  const theme = useTheme();

  const [checked, setChecked] = useState(false);

  return (
    <Container style={style}>
      <Check
        status={checked ? 'checked' : 'unchecked'}
        color={theme.colors.green_main}
        uncheckedColor={theme.colors.green_main}
        onPress={() => {
          setChecked(!checked);
        }}
        {...rest}
      />

      <Text>{text}</Text>
    </Container>
  );
}
