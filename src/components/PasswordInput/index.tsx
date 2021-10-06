import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  Text,
  ChangePasswordVisibilityButton,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof MaterialIcons>['name'];
}

export function PasswordInput({ iconName, ...rest }: Props) {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(oldState => !oldState);
  }

  return (
    <Container>
      <IconContainer>
        <MaterialIcons
          name={iconName}
          size={24}
          color={theme.colors.green_dark_main}
        />
      </IconContainer>

      <Text secureTextEntry={isPasswordVisible} {...rest} />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <ChangePasswordVisibilityButton>
          <MaterialIcons
            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
            size={23}
            color={theme.colors.title_item_gray}
          />
        </ChangePasswordVisibilityButton>
      </BorderlessButton>
    </Container>
  );
}
