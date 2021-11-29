/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation, CommonActions } from '@react-navigation/native';
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

interface Props {
  uri: string;
}

export function UserVerification() {
  const navigation = useNavigation();
  const theme = useTheme();

  const camRef = useRef(null);
  const [cameraIsOpen, setCameraIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [active, setActive] = useState(0);
  const [selfieImg, setSelfieImg] = useState(null);
  const [documentFrontImg, setDocumentFrontImg] = useState(null);
  const [documentBackImg, setDocumentBackImg] = useState(null);

  function setCapturedPhotos(param: string) {
    if (active === 0) {
      setSelfieImg(param);
    } else if (active === 1) {
      setDocumentFrontImg(param);
    } else if (active === 2) {
      setDocumentBackImg(param);
    }
  }

  function handleBack() {
    setPhotoPreview(null);
    setCapturedPhotos(null);
    navigation.goBack();
  }

  async function takePicture() {
    if (camRef) {
      const data: Props = await camRef.current.takePictureAsync();
      setPreviewVisible(true);
      setPhotoPreview(data.uri);
      setCapturedPhotos(data.uri);
    }
  }

  function retake() {
    setPreviewVisible(false);
    setPhotoPreview(null);
    setCapturedPhotos(null);
  }

  function onDone() {
    const data = {
      selfie: selfieImg,
      documentFront: documentFrontImg,
      documentBack: documentBackImg,
    };

    const formData = new FormData();
    formData.append('selfie[]', data.selfie);
    formData.append('documentFront[]', data.selfie);
    formData.append('documentBack[]', data.selfie);
    console.log(formData);

    UserApi.checkDocument(formData)
      .then(() => {
        navigation.dispatch(
          CommonActions.navigate('Confirmation', {
            title: `Sua conta\nfoi verificada!`,
            message: `Confirmamos que está todo ok!\nAgora você pode aproveitar 100% do app 🎉`,
            nextScreenRoute: 'UserAccount',
            buttonTitle: 'Vamos lá!',
          }),
        );
      })
      .catch(error => {
        Alert.alert(
          'Erro',
          'Houve um erro ao registrar suas fotos\nTente novamente!!\n💡 Não se esqueça de tirar fotos nítidas',
        );
        setActive(p => p - 2);
        setCapturedPhotos(null);
        console.log(error.response.data);
      });
  }

  const Steps = props => {
    return (
      <Content>
        <Image style={{ resizeMode: 'contain' }} source={props.image} />
        <Title>{props.title}</Title>
        <Text>{props.text}</Text>
      </Content>
    );
  };

  const content = [
    <Steps
      image={require('../../assets/img/selfie.png')}
      type="back"
      title="Tire uma foto do seu rosto"
      text={`Vá para um local iluminado\nMantenha o rosto centralizado na câmera`}
    />,
    <Steps
      image={require('../../assets/img/documentFront.jpg')}
      title="Tire uma foto da frente do documento"
      text={`Vá para um local iluminado\nEncaixe o documento na tela\nCertifique-se se os dados estão legíveis`}
    />,
    <Steps
      image={require('../../assets/img/documentFront.jpg')}
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
