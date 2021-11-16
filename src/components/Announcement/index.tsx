import React, { ReactElement } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import {
  Container,
  Image,
  Details,
  Description,
  Price,
  Publication,
  Status,
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
        {/* <Description>
          {data.title.length >= 20
            ? `${data.title.slice(0, 19)}...`
            : data.title}
        </Description> */}

        <Price>{`R$ ${data.price}/dia`}</Price>

        <Publication>
          {`${data.created_date} às ${data.created_time}`}
        </Publication>

        <Status>{data.available ? 'Disponível' : 'Indisponível'}</Status>
      </Details>
    </Container>
  );
}
