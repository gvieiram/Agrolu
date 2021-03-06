/* eslint-disable no-else-return */
import React, { useState, useEffect, useRef } from 'react';
import { Alert, Dimensions, ImageBackground, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Camera } from 'expo-camera';

import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { BackButton } from '../BackButton';
import {
  CameraContainer,
  CameraContent,
  ItemsContainer,
  TakePictureIcon,
  GoBack,
  Container,
  BottomTab,
  Text,
} from './styles';

interface Props {
  onlyType?: 'back' | 'front';
  cameraRef: React.MutableRefObject<any>;
  onTakePicture(): Promise<void>;
  handleBack(): void;
}

interface PhotoPreviewPros {
  photoUri: any;
  stepDone(): void;
  previewVisibilityOnRetake(): void;
}

function TakePicture({
  onlyType,
  cameraRef,
  onTakePicture,
  handleBack,

  ...rest
}: Props) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(0);

  const dimensions = useRef(Dimensions.get('window'));
  const screenWidth = dimensions.current.width;
  const screenHeight = Math.round((screenWidth * 16) / 9);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    Alert.alert('Acesso Negado', 'Para acessar a camera, conceda a permissão');
    return <View />;
  }

  const handleFlash = () => {
    if (flash === 1) {
      setFlash(0);
    }
    if (flash === 0) {
      setFlash(1);
    } else {
      setFlash(3);
    }
    if (flash === 3) {
      setFlash(0);
    }
  };

  return (
    <CameraContainer>
      <Camera
        ratio="16:9"
        style={{ flex: 1, width: screenWidth, height: screenHeight }}
        type={onlyType || type}
        ref={cameraRef}
        autoFocus="on"
        flashMode={flash}
        {...rest}
      >
        <CameraContent>
          <GoBack>
            <BackButton color="white" onPress={handleBack} />
          </GoBack>
          <ItemsContainer>
            {onlyType !== null ? (
              <MaterialIcons
                name="flip-camera-ios"
                size={32}
                color="transparent"
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  );
                }}
              >
                <MaterialIcons name="flip-camera-ios" size={32} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity activeOpacity={0.8} onPress={onTakePicture}>
              <TakePictureIcon />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => handleFlash()}>
              <MaterialIcons
                name={
                  // eslint-disable-next-line no-nested-ternary
                  flash === 1
                    ? 'flash-on'
                    : flash === 0
                    ? 'flash-off'
                    : 'flash-auto'
                }
                size={32}
                color="white"
              />
            </TouchableOpacity>
          </ItemsContainer>
        </CameraContent>
      </Camera>
    </CameraContainer>
  );
}

const PhotoPreview = ({
  photoUri,
  stepDone,
  previewVisibilityOnRetake,
}: PhotoPreviewPros) => {
  const theme = useTheme();

  return (
    <ImageBackground
      source={{ uri: photoUri }}
      style={{
        flex: 1,
        zIndex: 99,
      }}
    >
      <Container>
        <BottomTab>
          <TouchableOpacity
            onPress={previewVisibilityOnRetake}
            activeOpacity={0.9}
            style={{
              width: 130,
              height: 40,
              backgroundColor: theme.colors.cinza_apagado,

              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
          >
            <Text>Repetir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={stepDone}
            activeOpacity={0.9}
            style={{
              width: 130,
              height: 40,
              backgroundColor: theme.colors.green_dark_1,

              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
          >
            <Text>Próximo</Text>
          </TouchableOpacity>
        </BottomTab>
      </Container>
    </ImageBackground>
  );
};

export { PhotoPreview, TakePicture };
