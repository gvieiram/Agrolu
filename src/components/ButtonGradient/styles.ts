import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { LinearGradient } from 'expo-linear-gradient';

import styled from 'styled-components/native';

export const Button = styled(TouchableOpacity)`
  width: 100%;
  height: ${RFValue(50)}px;
`;

export const Gradient = styled(LinearGradient)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(16)}px;
`;
