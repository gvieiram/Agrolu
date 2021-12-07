import React, { useState, useRef } from 'react';
import { CheckBoxProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Checkbox as Check } from 'react-native-paper';

import { useTheme } from 'styled-components';

import { Container, Text } from './styles';

interface Props extends CheckBoxProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}

export function Checkbox({ text, style, textStyle, ...rest }: Props) {
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

      <Text style={textStyle}>{text}</Text>
    </Container>
  );
}
