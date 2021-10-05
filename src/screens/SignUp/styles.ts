import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import LogoSVG from '../../assets/img/logoHorizontal.svg';
import Button from '../../components/Button';

export const ContainerKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.green_background};
`;

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.green_background};
  padding: 0 40px;
`;

export const Logo = styled(LogoSVG)`
  align-self: center;
  margin-top: ${getStatusBarHeight() + 10}px;
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

export const Form = styled.View`
  width: 100%;
  margin: 25px 0 0 0;
`;

export const ButtonForm = styled(Button)`
  margin-top: 8px;
`;

export const LineView = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 13px 0;
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
  margin-bottom: 10px;

  width: 100%;
  height: 34px;

  border: 1px solid ${({ theme }) => theme.colors.green_main};
  border-radius: 10px;
`;

export const TextBtn = styled.Text`
  color: ${({ theme }) => theme.colors.green_main};
`;
