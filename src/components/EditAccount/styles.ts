import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import Button from '../Button';

export const Container = styled.View`
  margin-top: 25px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_dark_main};

  margin: 8px 0 5px 0;
`;
export const Error = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.error_dark};

  margin-bottom: 10px;
`;

export const ButtonForm = styled(Button)`
  margin-top: 30px;
  margin-bottom: ${Platform.OS === 'ios' ? 350 : 450}px;
`;
