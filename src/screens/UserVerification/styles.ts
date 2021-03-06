import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import { BackButton } from '../../components/BackButton';

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
  left: 0;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.green_main};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.green_main};
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.archivo};
  margin-top: 15px;
`;

export const Tutorials = styled.View`
  justify-content: center;
  margin-bottom: -25px;
`;

export const TextContent = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.cinza_apagado};
  font-family: ${({ theme }) => theme.fonts.medium_500};
  font-size: ${RFValue(15)}px;
  margin: 15px 0 0 10px;
`;

export const Image = styled.Image`
  height: ${RFPercentage(6)}%;
  width: ${RFPercentage(20)}%;
`;
