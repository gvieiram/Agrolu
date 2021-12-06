// import FastImage from 'react-native-fast-image';
import { RectButton, TouchableHighlight } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  height: 110px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;

  flex-direction: row;
  align-items: center;

  margin-bottom: 15px;
`;

export const ContainerSlider = styled(TouchableHighlight)`
  height: 110px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;

  flex-direction: row;
  align-items: center;

  margin-bottom: 15px;
`;

export const Image = styled.Image`
  height: 100%;
  width: 120px;
  background-color: ${({ theme }) => theme.colors.gray_line_input};

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const Details = styled.View`
  flex: 1;
  height: 100%;
  padding: 8px 0 8px 10px;
`;

export const Description = styled.Text`
  width: 96%;
  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(19)}px;
  color: ${({ theme }) => theme.colors.preto_titulo};

  margin-bottom: 8px;
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(16)}px;

  margin-bottom: 6px;
`;

export const Publication = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light_300};
  font-size: ${RFValue(11)}px;
  color: ${({ theme }) => theme.colors.preto_titulo};
`;

export const Status = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(9)}px;
  color: ${({ theme }) => theme.colors.success_main};
  margin-top: 5px;
`;

export const IconActive = styled.View`
  position: absolute;
  right: 15px;
  bottom: 15px;
`;

export const Visitors = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

export const NumberOfVisitors = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light_300};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.cinza_apagado};

  margin-left: 5px;
`;
