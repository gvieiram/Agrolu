import { KeyboardAvoidingView, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import LogoSVG from '../../../assets/img/logoHorizontal.svg';
import { BackButton as BackBtn } from '../../../components/BackButton';
import Button from '../../../components/Button';

export const ContainerKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.green_background};
`;

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.green_background};
  padding: 0 40px;
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 20};
`;

export const BackButton = styled(BackBtn)`
  align-self: flex-start;
  margin-left: -25px;
`;

export const Logo = styled(LogoSVG)`
  align-self: center;
  margin-bottom: ${RFValue(25)}px;
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
  line-height: ${RFValue(20)}px;
  margin-top: 16px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.creme};

  margin: 8px 0 5px 0;
`;

export const Form = styled.View`
  width: 100%;
  margin: 25px 0 0 0;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  margin: 0 6px 0 6px;
`;

export const ResendCode = styled.Text`
  color: ${({ theme }) => theme.colors.green_main};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  text-align: right;
  margin-right: 3px;

  margin-bottom: 65px;
`;

export const ButtonForm = styled(Button)`
  margin-top: 30px;
`;

export const Error = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.error_dark};

  margin-bottom: 10px;
`;
