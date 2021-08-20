import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
}

export default function Button({ title }: Props) {
  return (
    <Container activeOpacity={0.7}>
      <Title>{title}</Title>
    </Container>
  );
}
