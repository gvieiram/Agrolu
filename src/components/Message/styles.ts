// import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const MessagesContainer = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  margin: 0 16px;
`;

export const ImageWrapper = styled.View``;

export const Image = styled.Image`
  height: 79px;
  width: 97px;
  border-radius: 5px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  margin-left: 7px;
  justify-content: center;
  width: ${RFValue(235)}px;
`;

export const AnnouncementInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(19)}px;
  font-family: ${({ theme }) => theme.fonts.medium_500};
  color: ${({ theme }) => theme.colors.preto_titulo};
`;

export const Time = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.cinza_apagado};
`;
export const UserName = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.preto_titulo};
`;
export const MessageText = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular_400};
  color: ${({ theme }) => theme.colors.cinza_apagado};
`;
