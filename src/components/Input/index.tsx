import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

// import theme from '../../global/styles/theme';
import { useTheme } from 'styled-components';

import { Container, IconContainer, Text } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof MaterialIcons>['name'];
}

export function Input({ iconName, ...rest }: Props) {
  const theme = useTheme();

  /* const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  } */

  return (
    <Container>
      <IconContainer>
        <MaterialIcons
          name={iconName}
          size={24}
          color={theme.colors.green_dark_main}
          // color={isFocused ? theme.colors.error_light : iconColor}
        />
      </IconContainer>

      <Text
        // onFocus={handleInputFocus}
        // onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
}
