// import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import { BackButton as IconBack } from '../../components/BackButton';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.creme};
`;

export const Header = styled.View`
  width: 100%;
  height: 115px;
  background-color: ${({ theme }) => theme.colors.green_dark_main};
  justify-content: flex-end;
  padding: 15px;

  margin-bottom: 25px;
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

export const MessagesContainer = styled.View`
  flex-direction: row;
  margin: 24px 16px 24px 16px;
`;

export const Image = styled.Image`
  height: 100px;
  width: 82px;
`;

export const AnnouncementTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium_500};
  color: ${({ theme }) => theme.colors.preto_titulo};
`;

export const Time = styled.Text``;
export const Name = styled.Text``;
export const LastMessage = styled.Text``;

export const Line = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray_line_dark};

  margin: 25px;
`;
