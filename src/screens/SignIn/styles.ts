import { KeyboardAvoidingView } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import LogoSVG from '../../assets/img/logoHorizontal.svg';
import Button from '../../components/Button';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.green_background};
  padding: 0 40px;
`;

export const Logo = styled(LogoSVG)`
  align-self: center;
  margin-top: ${getStatusBarHeight() + 10}px;
  margin-bottom: ${RFValue(30)}px;
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

export const TextPassword = styled.Text`
  color: ${({ theme }) => theme.colors.green_main};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  text-align: right;
  margin-right: 3px;
`;

export const ButtonForm = styled(Button)`
  margin-top: 50px;
`;

export const DivText = styled.View`
  flex-direction: row;
  margin-top: ${RFValue(20)}px;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.cinza_apagado};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  margin-right: 6px;
`;

export const LinkCadastro = styled.Text`
  color: ${({ theme }) => theme.colors.green_main};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  text-decoration-line: underline;
  margin-bottom: 30px;
`;
