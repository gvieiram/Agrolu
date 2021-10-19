import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import { BackButton as IconBack } from '../../components/BackButton';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.cinza};
  align-items: center;
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

export const AnnouncementRef = styled(RectButton)`
  height: 100px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray_background};

  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  height: 100%;
  width: 110px;
`;

export const Description = styled.View`
  height: 100%;
  padding: 8px 0 8px 20px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.preto_titulo};

  margin-bottom: 6px;
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(14)}px;

  margin-bottom: 6px;
`;

export const ChatView = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
`;
