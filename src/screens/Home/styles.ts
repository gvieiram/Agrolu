import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { AnnouncementData } from '../../dtos/AnnouncementDTO';

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
  justify-content: space-between;
  flex-direction: row;
`;

export const Search = styled.View`
  height: 36px;
  width: 70%;
  background-color: ${({ theme }) => theme.colors.green_light_main};
  border-radius: 10px;

  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  padding: 0 15px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_linear_dark_opaque};
`;

export const SearchIcon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.green_linear_dark_opaque};
`;

export const IconsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Like = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.green_main};
  margin-right: 10px;
`;

export const Filter = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.colors.green_main};
`;

export const AnnouncementList = styled(
  FlatList as new () => FlatList<AnnouncementData>,
).attrs({
  contentContainerStyle: {
    padding: 15,
    paddingBottom: 90,
  },
  showsVerticalScrollIndicator: false,
})``;
