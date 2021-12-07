import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { BackButton } from '../BackButton';

export const Container = styled.View`
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
  left: 0;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_main};
`;

export const IconsContainer = styled.View`
  position: absolute;
  z-index: 1;
  right: 0;

  height: 100%;
  flex-direction: row;
  align-items: center;
`;

export const IconLikeOrMore = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.green_main};
  margin-right: 10px;
`;

export const MoreContent = styled.View`
  position: absolute;
  z-index: 1;
  top: 115px;
  right: 40px;
  width: 100px;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.green_dark_main};

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const Option = styled(TouchableOpacity)`
  margin-bottom: 8px;
`;

export const TextOption = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium_500};
  color: ${({ theme }) => theme.colors.green_main};
  text-align: center;
`;

export const Share = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.green_main};
`;
