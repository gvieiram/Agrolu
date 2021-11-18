import { RFValue } from 'react-native-responsive-fontsize';
import { SwipeListView } from 'react-native-swipe-list-view';

import styled from 'styled-components/native';

import { BackButton } from '../../components/BackButton';
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
`;

export const HeaderContent = styled.View`
  justify-content: center;
  flex-direction: row;
`;

export const ButtonBack = styled(BackButton)`
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
  SwipeListView as new () => SwipeListView<AnnouncementResponse>,
).attrs({
  contentContainerStyle: {
    padding: 15,
    paddingBottom: 90,
  },
  showsVerticalScrollIndicator: false,
})``;

export const HiddenItemContainer = styled.View`
  height: 110px;
  justify-content: center;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.colors.green_dark_opaque};
  border-radius: 10px;
  padding-right: 20px;
`;
