// import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const MessagesContainer = styled(RectButton)`
  flex-direction: row;
  margin: 24px 16px 24px 16px;
`;

export const Image = styled.Image`
  height: 100px;
  width: 82px;
`;

export const AnnouncementTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium_500};
  color: ${({ theme }) => theme.colors.preto_titulo};
`;

export const Time = styled.Text``;
export const Name = styled.Text``;
export const LastMessage = styled.Text``;
