import React, { ReactElement } from 'react';
import { GestureResponderEvent, TouchableHighlightProps } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import Bolt from '../../assets/img/bolt.svg';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import {
  Container,
  ContainerSlider,
  Image,
  Details,
  Description,
  Price,
  Publication,
  Status,
  IconActive,
  Visitors,
  NumberOfVisitors,
} from './styles';

interface Props extends RectButtonProps {
  data: AnnouncementResponse;
}

export default function Announcement({ data, ...rest }: Props): ReactElement {
  const theme = useTheme();

  return (
    <Container rippleColor={theme.colors.creme_background} {...rest}>
      <Image
        source={{
          uri: data.first_image.url,
        }}
        resizeMode="cover"
      />

      <Details>
        <Description numberOfLines={1}>{data.title}</Description>

        <Price>{`R$ ${data.price}/dia`}</Price>

        <Publication>
          {`${data.created_date} às ${data.created_time}`}
        </Publication>

        <Status>{data.available ? 'Disponível' : 'Indisponível'}</Status>
      </Details>
    </Container>
  );
}
