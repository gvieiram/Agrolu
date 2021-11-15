import React, { ReactElement } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import { RoomResponse } from '../../dtos/response/RoomResponseDTO';
import { MessagesContainer, Image, AnnouncementTitle } from './styles';

interface Props extends RectButtonProps {
  data: RoomResponse;
}

export default function Message({ data, ...rest }: Props): ReactElement {
  return (
    <MessagesContainer {...rest}>
      <Image source={{ uri: data.advertisement.first_image.url }} />
      <AnnouncementTitle>{data.advertisement.title}</AnnouncementTitle>
      <Text>{data.advertisement.advertiser.name}</Text>
    </MessagesContainer>
  );
}
