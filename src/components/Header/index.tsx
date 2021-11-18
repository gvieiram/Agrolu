import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import UserApi from '../../services/api/UserApi';
import {
  Container,
  HeaderContent,
  HeaderTitle,
  IconsContainer,
  IconLikeOrMore,
  Share,
  ButtonBack,
} from './styles';

const icons = ['heart', 'share', 'filter', 'more'];

interface HeaderProps {
  title?: string;
  GoBack?: () => void;
  announcement?: AnnouncementResponse;
  announcementOwns?: boolean;
  removeIcons?: boolean;
  firstIcon: typeof icons;
}

export function Header({
  title,
  GoBack,
  announcement,
  announcementOwns,
  removeIcons,
  firstIcon,
}: HeaderProps) {
  const navigation = useNavigation();

  const [favorite, setFavorite] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  function handleFavorite() {
    if (favorite) {
      UserApi.deleteAnnouncementFavorite(announcement.id);
    } else {
      UserApi.storeAnnouncementFavorite(announcement.id);
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleFirstIcon() {
    if (firstIcon.find(e => e === 'heart')) {
      return (
        <TouchableOpacity
          onPress={() => {
            setFavorite(!favorite);
            handleFavorite();
          }}
        >
          <IconLikeOrMore
            name={favorite ? 'favorite' : 'favorite-border'}
            size={24}
          />
        </TouchableOpacity>
      );
    }
    if (firstIcon.find(e => e === 'more')) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowMoreOptions(!showMoreOptions)}
        >
          <IconLikeOrMore name="more-vert" size={24} />
        </TouchableOpacity>
      );
    }
  }

  return (
    <Container>
      <HeaderContent>
        <ButtonBack onPress={GoBack || handleBack} />

        <HeaderTitle>
          {title.length >= 21 ? `${title.slice(0, 18)}...` : title}
        </HeaderTitle>

        {removeIcons ? null : (
          <IconsContainer>
            {handleFirstIcon()}
            <Share name="ios-share" size={24} />
          </IconsContainer>
        )}
      </HeaderContent>
    </Container>
  );
}
