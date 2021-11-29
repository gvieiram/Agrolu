/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Stepper from '../../components/Steps';
import { TakePicture, PhotoPreview } from '../../components/TakePicture';
import { CheckDocumentRequest } from '../../dtos/request/UserRequestDTO';
import UserApi from '../../services/api/UserApi';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  ButtonBack,
  Content,
  Title,
  Text,
  Image,
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
  const [active, setActive] = useState(0);

  function handleBack() {
    setCapturedPhoto([]);
    setPhotoPreview(null);
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

  function onDone() {
    const data = {
      selfie: capturedPhoto[0],
      documentFront: capturedPhoto[1],
      documentBack: capturedPhoto[2],
    };

    if (capturedPhoto.length === 3) {
      try {
        UserApi.checkDocument(data).then(() => {
          console.log('Deu boa');
        });
      } catch (error) {
        console.log('Deu ruim', error);
      }
    } else {
      // Mais de 3 fotos user refaz as steps
      setActive(p => p - 2);
      setCapturedPhoto([]);
      setPhotoPreview(null);

      Alert.alert(
        'Erro',
        'Houve um erro ao registrar suas fotos\nTente novamente e não se esqueça de tirar fotos nítidas',
      );
    }
  }

  const MyComponent = props => {
    return (
      <Content>
        <Image style={{ resizeMode: 'contain' }} source={props.image} />
        <Title>{props.title}</Title>
        <Text>{props.text}</Text>
      </Content>
    );
  };

  const content = [
    <MyComponent
      image={require('../../assets/img/selfie.png')}
      type="back"
      title="Tire uma foto do seu rosto"
      text={`Vá para um local iluminado\nMantenha o rosto centralizado na câmera`}
    />,
    <MyComponent
      image={require('../../assets/img/selfie.png')}
      title="Tire uma foto da frente do documento"
      text={`Vá para um local iluminado\nEncaixe o documento na tela\nCertifique-se se os dados estão legíveis`}
    />,
    <MyComponent
      image={require('../../assets/img/selfie.png')}
      title="Tire uma foto de trás do documento"
      text={`Vá para um local iluminado\nEncaixe o documento na tela\nCertifique-se se os dados estão legíveis`}
    />,
  ];

  if (cameraIsOpen) {
    return previewVisible ? (
      <PhotoPreview
        photoUri={photoPreview}
        previewVisibilityOnRetake={retake}
        stepDone={() => {
          setCameraIsOpen(false);
          setPreviewVisible(false);

          if (active === 2) {
            onDone();
          } else {
            setActive(p => p + 1);
          }
        }}
      />
    ) : (
      <TakePicture
        cameraRef={camRef}
        onTakePicture={takePicture}
        onlyType={type}
        handleBack={() => setCameraIsOpen(false)}
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
      <Stepper
        active={active}
        content={content}
        onBack={() => setActive(p => p)}
        onFinish={() => setCameraIsOpen(true)}
        onNext={() => {
          setCameraIsOpen(true);
          setType(() => {
            active === 0 ? setType(1) : setType(0);
          });
        }}
        showBackButton={false}
        disableScroll
        stepStyle={{ display: 'none' }}
        stepLineStyle={{ display: 'none' }}
        stepTextStyle={{ display: 'none' }}
        buttonStyle={{
          height: RFValue(48),
          width: RFValue(48),
          backgroundColor: theme.colors.success_main,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginVertical: 50,
        }}
        buttonIcon="photo-camera"
        wrapperStyle={{
          flex: 1,
          justifyContent: 'space-around',
        }}
      />
    </Container>
  );
}
