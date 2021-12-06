/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppLoading from 'expo-app-loading';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import AlertError from '../../components/AlertError';
import { Load } from '../../components/Load';
import Stepper from '../../components/Steps';
import { TakePicture, PhotoPreview } from '../../components/TakePicture';
import { useAuth } from '../../hooks/auth';
import UserApi from '../../services/api/UserApi';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  ButtonBack,
  Content,
  Title,
  Tutorials,
  TextContent,
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
  const [typeCam, setTypeCam] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [active, setActive] = useState(0);
  const [selfieImg, setSelfieImg] = useState(null);
  const [documentFrontImg, setDocumentFrontImg] = useState(null);
  const [documentBackImg, setDocumentBackImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  function setCapturedPhotos(param: string | null) {
    if (active === 0 && param) {
      setSelfieImg(param);
    } else if (active === 1 && param) {
      setDocumentFrontImg(param);
    } else if (active === 2 && param) {
      setDocumentBackImg(param);
    }

    if (param === null) {
      setSelfieImg(null);
      setDocumentFrontImg(null);
      setDocumentBackImg(null);
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

  function fileParams(param: string) {
    const fileName = param.split('/').pop();
    const match = /\.(\w+)$/.exec(fileName);
    const type = match ? `image/${match[1]}` : `image`;
    const data = {
      fileName,
      type,
    };
    return data;
  }

  function onDone() {
    setLoading(true);

    const formData = new FormData();
    const selfieParams = fileParams(selfieImg);
    const docFrontParams = fileParams(documentFrontImg);
    const docBackParams = fileParams(documentBackImg);

    formData.append('selfie', {
      uri: selfieImg,
      name: selfieParams.fileName,
      type: selfieParams.type,
    });
    formData.append('documentFront', {
      uri: documentFrontImg,
      name: docFrontParams.fileName,
      type: docFrontParams.type,
    });
    formData.append('documentBack', {
      uri: documentBackImg,
      name: docBackParams.fileName,
      type: docBackParams.type,
    });

    UserApi.checkDocument(formData)
      .then(() => {
        navigation.dispatch(
          CommonActions.navigate('Confirmation', {
            title: `Sua conta\nfoi verificada!`,
            message: `Confirmamos que está tudo ok!\nAgora você pode aproveitar 100% do app 🎉`,
            nextScreenRoute: 'UserAccount',
            buttonTitle: 'Vamos lá!',
          }),
        );
      })
      .catch(error => {
        AlertError(error);
        setActive(0);
        setCapturedPhotos(null);
      })
      .finally(() => setLoading(false));
  }

  const Steps = props => {
    return (
      <Content>
        <Image
          style={{ resizeMode: 'contain', marginTop: 20 }}
          source={props.image}
        />
        <Title>{props.title}</Title>
        <Tutorials>
          <TextContent>
            <MaterialIcons
              name="check"
              size={24}
              color={theme.colors.green_dark_1}
              style={{ marginBottom: -10 }}
            />
            <Text>{props.textOne}</Text>
          </TextContent>
          <TextContent>
            <MaterialIcons
              name="check"
              size={24}
              color={theme.colors.green_dark_1}
              style={{ marginBottom: -10 }}
            />
            <Text>{props.textTwo}</Text>
          </TextContent>
          <TextContent>
            <MaterialIcons
              name="check"
              size={24}
              color={theme.colors.green_dark_1}
              style={{ marginBottom: -10 }}
            />
            <Text>{props.textThree}</Text>
          </TextContent>
        </Tutorials>
      </Content>
    );
  };

  const content = [
    <Steps
      image={require('../../assets/img/selfie.png')}
      title="Tire uma foto do seu rosto"
      textOne="Certifique-se de estar em um local bem iluminado"
      textTwo="Mantenha uma expressão neutra"
      textThree="Evite usar óculos e máscara"
    />,
    <Steps
      image={require('../../assets/img/documentFront.jpg')}
      title="Tire uma foto da frente do documento"
      textOne="Certifique-se de estar em um local bem iluminado"
      textTwo="Centralize a parte da frente do documento na tela do dispositivo"
      textThree="Certifique-se de que todos os dados estejam visíveis"
    />,
    <Steps
      image={require('../../assets/img/documentFront.jpg')}
      title="Tire uma foto do verso do documento"
      textOne="Certifique-se de estar em um local bem iluminado"
      textTwo="Centralize a parte do verso do documento na tela do dispositivo"
      textThree="Certifique-se de que todos os dados estejam visíveis"
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
        onlyType={typeCam}
        handleBack={() => setCameraIsOpen(false)}
      />
    );
  }

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <ButtonBack onPress={handleBack} />
            <HeaderTitle>Verificar Documento</HeaderTitle>
          </HeaderContent>
        </Header>
        <Load />
      </Container>
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
          setTypeCam(() => {
            active === 0 ? setTypeCam(1) : setTypeCam(null);
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
