import React from 'react';

import { LinearGradientProps } from 'expo-linear-gradient';

import { Gradient, Button, Title } from './styles';

interface ButtonGradientProps {
  title: string;
}

export default function ButtonGradient({
  title,
  ...rest
}: ButtonGradientProps) {
  return (
    <Button activeOpacity={0.7}>
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
