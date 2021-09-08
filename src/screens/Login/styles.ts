import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import LogoSVG from '../../assets/img/logoHorizontal.svg';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.green_background};
`;

export const ContainerLogin = styled.View`
  flex: 1;
  margin: 0 ${RFValue(40)}px;
  justify-content: center;
`;

export const Logo = styled(LogoSVG)`
  align-self: center;
  margin-bottom: ${RFValue(40)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.green_main};
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.archivo};
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
`;

export const Form = styled.View`
  width: 100%;
  margin: 48px 0 24px 0;
`;
