import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import LogoSVG from '../../assets/img/logoHorizontal.svg';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.green_background};
  padding: 0 40px;
`;

export const Logo = styled(LogoSVG)`
  align-self: center;
  margin-top: ${getStatusBarHeight() + 40}px;
  margin-bottom: ${RFValue(30)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.green_main};
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.archivo};
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  line-height: ${RFValue(20)}px;
  margin-bottom: ${RFValue(90)}px;
`;
