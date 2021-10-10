import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const PasswordRules = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.creme};
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(12)}px;
  margin-left: 3px;
`;
