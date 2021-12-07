import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  width: 90%;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(16)}px;
  flex-wrap: wrap;
`;
