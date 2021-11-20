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
  cardSlider?: boolean;
  iconActive?: boolean;
  visitorsActive?: boolean;
  onLongPress?: (event: GestureResponderEvent) => void;
  delayLongPress?: null | number;
}

export default function Announcement({
  data,
  cardSlider,
  iconActive,
  visitorsActive,
  ...rest
}: Props): ReactElement {
  const theme = useTheme();

  if (!cardSlider) {
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
  return (
    <ContainerSlider underlayColor="#dfdfdf" {...rest} onLongPress={e => e}>
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
              <NumberOfVisitors>
                {data.visits === 1
                  ? `${data.visits} visita`
                  : `${data.visits} visitas`}
              </NumberOfVisitors>
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
    </ContainerSlider>
  );
}
