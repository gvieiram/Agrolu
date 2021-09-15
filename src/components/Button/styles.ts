import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: ${RFValue(55)}px;
  background-color: ${({ theme }) => theme.colors.green_vibrant};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(15)}px;
`;