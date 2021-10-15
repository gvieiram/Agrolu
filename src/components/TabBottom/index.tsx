import React from 'react';
import { GestureResponderEvent, TouchableOpacityProps } from 'react-native';

import { useTheme } from 'styled-components';

import IconBolt from '../../assets/img/bolt.svg';
import IconWechat from '../../assets/img/wechat.svg';
import { Container, Title, Button } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  Icon: typeof IconWechat | typeof IconBolt;
}

export default function TabBottom({ title, Icon, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <Button activeOpacity={0.7} {...rest}>
        <Icon width={32} height={32} fill={theme.colors.green_main} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
