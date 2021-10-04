import * as React from 'react';
import { TextInputProps } from 'react-native';

import { Feather, MaterialIcons } from '@expo/vector-icons';

import { Container, IconContainer, Text } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof MaterialIcons>['name'];
  iconColor: string;
}

export function Input({ iconName, iconColor, ...rest }: Props) {
  return (
    <Container>
      <IconContainer>
        <MaterialIcons name={iconName} size={24} color={iconColor} />
      </IconContainer>

      <Text {...rest} />
    </Container>
  );
}
