import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

import { BackButton as IconBack } from '../../components/BackButton';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.creme_background};
`;

export const ContainerContent = styled.View`
  padding: 0 16px 0 16px;
  margin-bottom: 110px;
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

export const Image = styled(TouchableOpacity)`
  height: 205px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cinza};
  border: 1px dashed ${({ theme }) => theme.colors.cinza_apagado};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export const TextImage = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.bold_700};
  color: ${({ theme }) => theme.colors.green_dark_3};
  margin: 5px 0 5px 0;
`;

export const CountImage = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.bold_700};
  color: ${({ theme }) => theme.colors.cinza_apagado};
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.preto_titulo};

  margin-top: 24px;
`;

export const InputTitle = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.white};
  height: 50px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.preto_titulo};

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border_input};
  padding: 0 11px;
`;

export const InputDescription = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.preto_titulo};

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border_input};
  padding: 11px;

  text-align: justify;
`;

export const ContainerImageSelection = styled.View`
  flex: 1;
  margin-top: 40px;
`;
