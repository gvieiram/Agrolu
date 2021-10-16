import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.creme_background};
  padding: 0 16px 0 16px;
`;

export const Image = styled(TouchableOpacity)`
  height: 205px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cinza};
  border: 1px dashed ${({ theme }) => theme.colors.cinza_apagado};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const TextImage = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.bold_700};
  color: ${({ theme }) => theme.colors.green_dark_3};
  margin: 5px 0 5px 0;
`;

export const CountImage = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.bold_700};
  color: ${({ theme }) => theme.colors.cinza_apagado};
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.preto_titulo};
`;
