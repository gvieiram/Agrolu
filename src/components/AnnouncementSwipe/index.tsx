import React, { ReactElement } from 'react';
import { TouchableHighlightProps } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import Bolt from '../../assets/img/bolt.svg';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import {
  Container,
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

interface Props extends TouchableHighlightProps {
  data: AnnouncementResponse;
  iconActive?: boolean;
  visitorsActive?: boolean;
}

export default function AnnouncementSwipe({
  data,
  iconActive,
  visitorsActive,
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

          {visitorsActive ? (
            <Visitors>
              <MaterialIcons
                name="supervisor-account"
                size={16}
                color={theme.colors.cinza_apagado}
              />
              <NumberOfVisitors>{data.visits}</NumberOfVisitors>
            </Visitors>
          ) : (
            <Status>{data.available ? 'Disponível' : 'Indisponível'}</Status>
          )}
        </Details>

        <IconActive>
          {iconActive ? (
            <Bolt width={28} height={28} fill={theme.colors.green_main} />
          ) : null}
        </IconActive>
      </>
    </Container>
  );
}
