// import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 15px;
`;

export const HeaderContent = styled.View`
  justify-content: center;
  flex-direction: row;
  padding: 30px 0;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray_line_dark};
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold_700};
  color: ${({ theme }) => theme.colors.green_dark_main};
`;

export const BtnContainer = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 30px 0;
  align-items: center;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.gray_line_dark};
`;

export const Thumbnail = styled.Image`
  height: 110px;
  width: 110px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray_line_dark};
`;

export const Description = styled.View`
  flex: 1;
  height: 110px;
  justify-content: space-between;
  margin-left: 8px;
  padding: 8px 0;
`;

export const Title = styled.Text`
  font-size: ${RFValue(19)}px;
  font-family: ${({ theme }) => theme.fonts.bold_700};
  color: ${({ theme }) => theme.colors.preto_titulo};
`;

export const TextContent = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  color: ${({ theme }) => theme.colors.black};
`;

export const Publication = styled.Text`
  font-size: ${RFValue(11)}px;
  font-family: ${({ theme }) => theme.fonts.light_300};
  color: ${({ theme }) => theme.colors.black};
`;
