import React from 'react';
import { Platform } from 'react-native';
import { SearchBar as Search, SearchBarProps } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container } from './styles';

interface SearchProps extends SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchProps) {
  const theme = useTheme();

  return (
    <Container>
      <Search
        platform="ios"
        placeholder="Buscar"
        onChangeText={onChangeText}
        value={value}
        cancelButtonTitle="Cancelar"
        showLoading
        containerStyle={{
          height: RFValue(40),
          backgroundColor: theme.colors.green_dark_main,
        }}
        inputContainerStyle={{
          backgroundColor: theme.colors.green_light_main,
          borderRadius: 10,
        }}
        inputStyle={{ color: theme.colors.cinza }}
        placeholderTextColor={theme.colors.green_linear_dark_opaque}
        cancelButtonProps={{
          buttonTextStyle: {
            fontSize: 16,
          },
        }}
        clearIcon={{
          color: theme.colors.green_linear_dark_opaque,
          type: 'material',
          name: 'cancel',
        }}
        searchIcon={{
          color: theme.colors.green_linear_dark_opaque,
          type: 'material',
          name: 'search',
        }}
      />
    </Container>
  );
}
