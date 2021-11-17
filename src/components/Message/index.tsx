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
          <Time>
            {new Date(data.last_message.created_at).toLocaleDateString(
              'pt-BR',
              { year: 'numeric', month: '2-digit', day: '2-digit' },
            )}
          </Time>
        </AnnouncementInfoText>
        <UserName>{data.advertisement.advertiser.name}</UserName>
        <MessageText>{data.last_message.message}</MessageText>
      </TextSection>
    </MessagesContainer>
  );
}
