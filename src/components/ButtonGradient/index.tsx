import React from 'react';
import { GestureResponderEvent } from 'react-native';

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
  return (
    <Button activeOpacity={0.7} onPress={onPress}>
      <Gradient
        colors={['#A2C11C', '#2C5D63']}
        start={{ y: 0.0, x: 0.0 }}
        end={{ y: 0.0, x: 1.0 }}
        {...rest}
      >
        <Title>{title}</Title>
      </Gradient>
    </Button>
  );
}
