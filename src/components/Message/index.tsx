import React, { ReactElement } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import { Room } from '../../dtos/ChatDTO';
import { MessagesContainer, Image, AnnouncementTitle } from './styles';

interface Props extends RectButtonProps {
  data: Room;
}

export default function Message({ data, ...rest }: Props): ReactElement {
  return (
    <MessagesContainer>
      <Image source={{ uri: data.advertisement.first_image.url }} />
      <AnnouncementTitle>{data.advertisement.title}</AnnouncementTitle>
      <Text>{data.advertisement.advertiser.name}</Text>
    </MessagesContainer>
  );
}
