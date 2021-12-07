// import FastImage from 'react-native-fast-image';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import { BackButton as IconBack } from '../../components/BackButton';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.creme};
`;

export const Content = styled.View`
  padding: 0 15px;
`;

export const Header = styled.View`
  width: 100%;
  height: 115px;
  background-color: ${({ theme }) => theme.colors.green_dark_main};
  justify-content: flex-end;
  padding: 15px;
`;

export const HeaderContent = styled.View`
  justify-content: center;
  flex-direction: row;
`;

export const BackButton = styled(IconBack)`
  position: absolute;
  z-index: 1;
  left: 3px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_main};
`;

export const TitleContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  padding: 30px 0;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray_line_dark};
`;

export const TitlePost = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold_700};
  color: ${({ theme }) => theme.colors.green_dark_main};
  text-align: center;
`;

export const Publication = styled.Text`
  font-size: ${RFValue(11)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  color: ${({ theme }) => theme.colors.black};
  margin: 15px 0;
`;

export const Thumbnail = styled.Image`
  height: 215px;
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray_line_dark};
  margin-top: 30px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(19)}px;
  font-family: ${({ theme }) => theme.fonts.bold_700};
  color: ${({ theme }) => theme.colors.preto_titulo};
`;

export const TextContent = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  color: ${({ theme }) => theme.colors.black};
`;

export const LinkTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  color: ${({ theme }) => theme.colors.black};
  margin-top: 30px;
`;

export const LinkContainer = styled(TouchableOpacity)``;

export const LinkText = styled.Text`
  font-size: ${RFValue(11)}px;
  font-family: ${({ theme }) => theme.fonts.bold_700};
  color: ${({ theme }) => theme.colors.green_dark_1};
  margin-bottom: 50px;
`;
