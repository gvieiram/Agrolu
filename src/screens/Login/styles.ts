import { TouchableOpacity } from 'react-native';
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

export const Social = styled.View`
  margin: 10px 75px 38px 75px;
  justify-content: center;
  align-items: center;
`;

export const LineView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  margin: 0 6px 0 6px;
`;

export const SocialButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 3px 18px;
  margin-bottom: 15px;

  width: 100%;
  height: 34px;

  border: 1px solid #a0bf1d;
  border-radius: 10px;
`;

export const TextBtn = styled.Text`
  color: #a0bf1d;
`;
