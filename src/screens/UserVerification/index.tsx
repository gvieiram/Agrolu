import React, { useState, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import { TakePicture } from '../../components/TakePicture';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  ButtonBack,
} from './styles';

export function UserVerification() {
  const navigation = useNavigation();

  const camRef = useRef(null);
  const [cameraIsOpen, setCameraIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState([]);

  function handleBack() {
    navigation.goBack();
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(oldState => [...oldState, data.uri]);
      setCameraIsOpen(false);
    }
  }

  if (cameraIsOpen) {
    return (
      <TakePicture
        cameraRef={camRef}
        onTakePicture={takePicture}
        onlyType={type}
      />
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <ButtonBack onPress={handleBack} />
          <HeaderTitle>Verificar Documento</HeaderTitle>
          {console.log('Photos', [capturedPhoto])}
        </HeaderContent>
      </Header>
      <Button
        title="Foto"
        onPress={() => {
          setCameraIsOpen(true);
          setType('front');
        }}
      />
    </Container>
  );
}
