import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

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

interface Props extends RectButtonProps {
  data: AnnouncementData;
}

export function Announcement({ data, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container rippleColor={theme.colors.creme_background} {...rest}>
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
