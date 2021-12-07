import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import { BackButton as IconBack } from '../../components/BackButton';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';

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

export const Text = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_linear_dark_opaque};
`;

export const AnnouncementList = styled(
  FlatList as new () => FlatList<AnnouncementResponse>,
).attrs({
  contentContainerStyle: {
    padding: 15,
    paddingBottom: 90,
  },
  showsVerticalScrollIndicator: false,
})``;
