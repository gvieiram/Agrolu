import React from 'react';
import { TextInputMaskProps } from 'react-native-masked-text';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, IconContainer, Text } from './styles';

interface Props extends TextInputMaskProps {
  iconName: React.ComponentProps<typeof MaterialIcons>['name'];
}

export function InputMask({ iconName, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container>
      <IconContainer>
        <MaterialIcons
          name={iconName}
          size={24}
          color={theme.colors.green_dark_main}
        />
      </IconContainer>

      <Text {...rest} />
    </Container>
  );
}
