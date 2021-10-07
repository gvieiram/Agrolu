import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Error = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.error_dark};

  margin-bottom: 10px;
`;
