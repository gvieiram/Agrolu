import React, { ReactElement } from 'react';
import { TouchableHighlightProps } from 'react-native';

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

interface Props extends TouchableHighlightProps {
  data: AnnouncementResponse;
}

export default function AnnouncementSwipe({
  data,
  ...rest
}: Props): ReactElement {
  const theme = useTheme();

  return (
    <Container underlayColor="#dfdfdf" {...rest}>
      <>
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
      </>
    </Container>
  );
}
