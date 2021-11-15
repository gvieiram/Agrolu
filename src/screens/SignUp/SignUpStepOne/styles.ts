import { KeyboardAvoidingView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import LogoFacebook from '../../../assets/img/facebook.svg';
import LogoGoogle from '../../../assets/img/google.svg';
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

export const Logo = styled(LogoSVG)`
  align-self: center;
  margin-top: ${Platform.OS === 'ios' ? 0 : getStatusBarHeight() + 10};
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
  color: ${({ theme }) => theme.colors.green_main};
  text-decoration: underline;
  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(16)}px;
`;

export const StepTwo = styled.Text`
  color: ${({ theme }) => theme.colors.green_dark_3};
  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(16)}px;
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

export const SocialContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  height: ${RFValue(70)}px;
  align-items: center;
`;

export const SocialButton = styled(TouchableOpacity)`
  width: 55px;
  height: 55px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.white};

  justify-content: center;
  align-items: center;
`;

export const IconGoogle = styled(LogoGoogle)`
  width: 35px;
  height: 35px;
`;

export const IconFacebook = styled(LogoFacebook)`
  width: 35px;
  height: 35px;
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 15};
`;

export const BackButton = styled(BackBtn)`
  align-self: flex-start;
  margin-left: -25px;
`;
