import React, { ReactElement } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { RoomResponse } from '../../dtos/response/RoomResponseDTO';
import {
  MessagesContainer,
  ImageWrapper,
  Image,
  AnnouncementInfoText,
  Title,
  Time,
  TextSection,
  UserName,
  MessageText,
} from './styles';

interface Props extends TouchableOpacityProps {
  data: RoomResponse;
}

export default function Message({ data, ...rest }: Props): ReactElement {
  return (
    <MessagesContainer activeOpacity={0.7} {...rest}>
      <ImageWrapper>
        <Image source={{ uri: data.advertisement.first_image.url }} />
      </ImageWrapper>
      <TextSection>
        <AnnouncementInfoText>
          <Title>
            {data.advertisement.title.length >= 20
              ? `${data.advertisement.title.slice(0, 18)}...`
              : data.advertisement.title}
          </Title>
          <Time>{data.last_message.created_time}</Time>
        </AnnouncementInfoText>
        <UserName>{data.title}</UserName>
        <MessageText>{data.last_message.message}</MessageText>
      </TextSection>
    </MessagesContainer>
  );
}
