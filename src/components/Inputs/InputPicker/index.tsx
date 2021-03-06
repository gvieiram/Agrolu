import React, { useState } from 'react';

import { Picker, PickerProps } from '@react-native-picker/picker';
import { useTheme } from 'styled-components';

import { Container } from './styles';

interface Props extends PickerProps {
  labelDisable: string;
  items: Array<PickerItems>;
  itemKey?: string;
}

interface PickerItems {
  label: string;
  value: string;
  color?: string;
}

export function InputPicker({ items, labelDisable, itemKey, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <Picker
        style={{ height: 50, marginHorizontal: 3 }}
        dropdownIconColor={theme.colors.green_dark_2}
        {...rest}
      >
        <Picker.Item
          label={labelDisable}
          value={null}
          key={0}
          enabled={false}
          color="gray"
        />
        {items.map(item => {
          return (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={item.value || itemKey}
              color="black"
            />
          );
        })}
      </Picker>
    </Container>
  );
}
