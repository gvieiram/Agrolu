import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
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
  margin-top: ${Platform.OS === 'ios' ? 10 : getStatusBarHeight() + 10};
  margin-bottom: ${RFValue(50)}px;
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

export const Form = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.creme_background_opacity};
  height: 60px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-around;
  margin: 25px 0 10px 0;
`;

export const CodeInput = styled(TextInput)`
  height: 45px;
  width: 40px;
  text-align: center;
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold_700};

  border-bottom-width: 1.5px;
  border-bottom-color: ${({ theme }) => theme.colors.green_main};
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

  margin-bottom: 55px;
`;

export const ButtonForm = styled(Button)`
  /* margin-top: 65px; */
`;
