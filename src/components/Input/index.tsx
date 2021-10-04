import React from 'react';
import { TextInputProps } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Container, IconContainer, Text } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconColor: string;
}

export function Input({ iconName, iconColor, ...rest }: Props) {
  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={iconColor} />
      </IconContainer>

      <Text {...rest} />
    </Container>
  );
}
