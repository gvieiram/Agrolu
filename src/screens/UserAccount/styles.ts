import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { BackButton } from '../../components/BackButton';

export const Container = styled.View`
  flex: 1;
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
  left: 0;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_main};
`;

export const AccountContent = styled.View`
  padding: 0 16px 100px 16px;
`;

export const User = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${Platform.OS === 'ios' ? 15 : 5};
`;

export const ImageWrapper = styled.View`
  width: 115px;
  height: 115px;
  border-radius: 58px;

  justify-content: center;
  align-items: center;
`;

export const UserIconWrapper = styled.View`
  position: absolute;
  top: -5px;
  left: -4.5px;
`;

export const UserImageIcon = styled(MaterialIcons)`
  font-size: 125px;
  color: ${({ theme }) => theme.colors.green_main};
`;

export const UserImage = styled.Image`
  width: 115px;
  height: 115px;
  border-radius: 58px;
`;

export const UserName = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_dark_main};

  margin-top: 5px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray_line_dark};

  margin: 25px 0;
`;

export const UserOptions = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const Card = styled(TouchableOpacity)`
  width: 130px;
  height: 115px;
  background-color: ${({ theme }) => theme.colors.creme};

  justify-content: center;
  align-items: center;
  margin-bottom: ${Platform.OS === 'ios' ? 25 : 20};

  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

export const CardIcon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.green_dark_1};
`;

export const CardText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_dark_1};
  text-align: center;
  margin-top: 10px;
`;
