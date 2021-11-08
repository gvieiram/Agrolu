import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

export function Load() {
  const theme = useTheme();

  return (
    <ActivityIndicator
      color={theme.colors.green_linear_dark_opaque}
      size={25}
      style={{ flex: 1 }}
    />
  );
}
