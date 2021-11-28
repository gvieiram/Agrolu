import React, { useState, useRef } from 'react';
import { Dimensions, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { TakePicture, PhotoPreview } from '../../components/TakePicture';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  ButtonBack,
  NextButton,
  ButtonText,
  Content,
  Title,
  Text,
  CamButton,
} from './styles';

export function UserVerification() {
  const navigation = useNavigation();
  const theme = useTheme();

  const camRef = useRef(null);
  const [cameraIsOpen, setCameraIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [nextButtonVisible, setNextButtonVisible] = useState(true);

  function handleBack() {
    navigation.goBack();
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setPreviewVisible(true);
      setPhotoPreview(data.uri);
      setCapturedPhoto(oldState => [...oldState, data.uri]);
    }
  }

  function retake() {
    setPreviewVisible(false);
    setPhotoPreview(null);

    setCapturedPhoto(oldState =>
      oldState.filter(photo => photo !== photoPreview),
    );
  }

  const slides = [
    {
      key: '1',
      title: 'Tire uma foto do seu rosto',
      text: 'Vá para um local iluminado\nMantenha o rosto centralizado na câmera',
      camType: 'front',
      image: require('../../assets/img/selfie.png'),
    },
    {
      key: '2',
      title: 'Tire uma foto da frente da CNH',
      text: 'Vá para um local iluminado\nEncaixe o documento na tela\nCertifique-se se os dados estão legíveis',
      camType: null,
    },
    {
      key: '3',
      title: 'Tire uma foto de trás da CNH',
      text: 'Vá para um local iluminado\nEncaixe o documento na tela\nCertifique-se se os dados estão legíveis',
      camType: null,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <Content>
        <Image
          source={item.image}
          style={{ resizeMode: 'contain', height: '60%', width: '90%' }}
        />
        <Title>{item.title}</Title>
        <Text>{item.text}</Text>
        <CamButton
          onPress={() => {
            setCameraIsOpen(true);
            setType(item.camType);
          }}
        >
          <MaterialIcons
            name="photo-camera"
            color={theme.colors.white}
            size={32}
          />
        </CamButton>
      </Content>
    );
  };

  function renderNextButton() {
    return (
      <NextButton>
        <MaterialIcons
          name="chevron-right"
          color={theme.colors.green_dark_main}
          size={26}
        />
      </NextButton>
    );
  }

  if (cameraIsOpen) {
    return previewVisible ? (
      <PhotoPreview
        photoUri={photoPreview}
        previewVisibilityOnRetake={retake}
        stepDone={() => {
          setCameraIsOpen(false);
          setPreviewVisible(false);
        }}
      />
    ) : (
      <TakePicture
        cameraRef={camRef}
        onTakePicture={takePicture}
        onlyType={type}
        handleBack={handleBack}
      />
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <ButtonBack onPress={handleBack} />
          <HeaderTitle>Verificar Documento</HeaderTitle>
          {/* {console.log('Photos', [capturedPhoto])} */}
        </HeaderContent>
      </Header>
      <AppIntroSlider
        keyExtractor={item => item.key}
        scrollEnabled={false}
        dotClickEnabled={false}
        renderItem={renderItem}
        data={slides}
        renderNextButton={renderNextButton}
        activeDotStyle={{
          backgroundColor: theme.colors.green_dark_1,
          paddingHorizontal: 10,
        }}
        showNextButton={nextButtonVisible}
      />
    </Container>
  );
}
