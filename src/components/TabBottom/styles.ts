import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.green_dark_main};
  height: 58px;
  width: 80%;
  position: absolute;
  z-index: 10;
  bottom: 15px;
  justify-content: center;
  align-self: center;
  border-radius: 50px;
`;

export const Button = styled(TouchableOpacity)`
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.green_dark_main};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  margin-left: 13px;
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.medium_500};
  color: ${({ theme }) => theme.colors.green_main};
`;
