import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: ${RFValue(40)}px;
  background-color: ${({ theme }) => theme.colors.darkGreen};
  margin-bottom: ${RFValue(20)}px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const Title = styled.Text`
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.medium_500};
`;
