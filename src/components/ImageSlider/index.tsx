import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import { Image as ImageAnnouncement } from '../../dtos/response/AnnouncementResponseDTO';
import {
  Container,
  ImageIndexes,
  ImageIndex,
  ImageWrapper,
  Image,
} from './styles';

interface Props {
  imagesUrl: ImageAnnouncement[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <ImageIndex key={String(item.id)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ImageWrapper>
            <Image source={{ uri: item.url }} resizeMode="cover" />
          </ImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
