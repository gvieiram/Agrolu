import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.creme_background};
`;

export const Header = styled.View`
  width: 100%;
  height: 115px;
  background-color: ${({ theme }) => theme.colors.green_dark_main};
  justify-content: flex-end;
  padding: 15px 15px 10px 15px;
`;

export const HeaderContent = styled.View`
  justify-content: space-between;
  flex-direction: row;
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
  FlatList as new () => FlatList<AnnouncementResponse>,
).attrs({
  contentContainerStyle: {
    padding: 15,
    paddingBottom: 90,
  },
  showsVerticalScrollIndicator: false,
})``;

export const TextEndItems = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.gray_line_dark};
  text-align: center;
`;

export const FiltersContent = styled.View`
  padding: 0 16px 0 16px;
  margin-bottom: 110px;
`;

export const FiltersTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.preto_titulo};
  margin-top: 15px;
`;

export const FiltersButtons = styled.View`
  /* justify-content: space-between; */
  /* flex-wrap: wrap; */
`;

// export const FilterButton = styled(TouchableOpacity)`
//   /* background-color: ${({ theme }) => theme.colors.green_main}; */
//   flex-grow: 1;
//   flex-basis: 0;

//   border-radius: 10px;
//   border-width: 1px;
//   border-color: ${({ theme }) => theme.colors.green_main};
//   align-items: center;

//   padding: 3px 20px;
//   margin-top: 15px;
// `;

export const FilterText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium_500};
  color: ${({ theme }) => theme.colors.green_main};
`;
