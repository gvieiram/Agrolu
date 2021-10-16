import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { useTheme } from 'styled-components';

import { Gradient, Button, Title } from './styles';

interface ButtonGradientProps {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) & (() => void);
}

export default function ButtonGradient({
  title,
  onPress,
  ...rest
}: ButtonGradientProps) {
  const theme = useTheme();

  return (
    <Button activeOpacity={0.7} onPress={onPress}>
      <Gradient
        colors={[
          theme.colors.green_linear_light,
          theme.colors.green_linear_dark,
        ]}
        start={{ y: 0.0, x: 0.0 }}
        end={{ y: 0.0, x: 1.0 }}
        {...rest}
      >
        <Title>{title}</Title>
      </Gradient>
    </Button>
  );
}
