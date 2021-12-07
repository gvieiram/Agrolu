import { KeyboardAvoidingView, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import LogoSVG from '../../../assets/img/logoHorizontal.svg';
import { BackButton as BackBtn } from '../../../components/BackButton';
import Button from '../../../components/Button';

export const ContainerKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  background: ${({ theme }) => theme.colors.green_background};
`;

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.green_background};
  padding: 0 40px;
`;

export const Logo = styled(LogoSVG)`
  align-self: center;
  margin-bottom: ${RFValue(15)}px;
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
`;

export const ActiveScreen = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 5px -18px 5px;
`;

export const StepOne = styled.Text`
  color: ${({ theme }) => theme.colors.green_dark_3};
  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(16)}px;
`;

export const StepTwo = styled.Text`
  color: ${({ theme }) => theme.colors.green_main};
  text-decoration: underline;

  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(16)}px;
`;

export const Form = styled.View`
  width: 100%;
  margin: 25px 0 0 0;
`;

export const PasswordRules = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.creme};
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(12)}px;
  margin-left: 3px;
`;

export const ButtonForm = styled(Button)`
  margin: 30px 0 50px 0;
`;

export const Error = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.error_dark};

  margin-bottom: 10px;
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 30}px;
`;

export const BackButton = styled(BackBtn)`
  align-self: flex-start;
  margin-left: -25px;
`;
