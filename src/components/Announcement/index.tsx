import React from 'react';

import {
  Container,
  Image,
  Details,
  Description,
  Price,
  Publication,
  Status,
} from './styles';

interface AnnouncementData {
  description: string;
  price: number;
  publication: string;
  status: string;
  thumbnail: string;
}

interface Props {
  data: AnnouncementData;
}

export function Announcement({ data }: Props) {
  return (
    <Container>
      <Image
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />

      <Details>
        <Description>{data.description}</Description>

        <Price>{`R$ ${data.price}/dia`}</Price>

        <Publication>{data.publication}</Publication>

        <Status>{data.status}</Status>
      </Details>
    </Container>
  );
}
