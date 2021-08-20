import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const ImageBackground = styled.ImageBackground`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.opacityColor};
  padding: 0 50px;
`;

export const Logo = styled.View`
  position: absolute;
`;

export const ContainerText = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${RFValue(70)}px;
`;

export const ButtonCadastro = styled.Button`
  /* background: ${({ theme }) => theme.colors.darkGreen}; */
`;

export const DivText = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: 14px;
  color: #fff;
`;

export const LinkCadastro = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold_700};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.beige};
  margin-left: 5px;
`;
