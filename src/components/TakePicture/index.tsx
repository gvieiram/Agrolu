/* eslint-disable no-else-return */
import React, { useState, useEffect, useRef } from 'react';
import { Alert, Dimensions, ImageBackground, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Camera } from 'expo-camera';

import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

import { BackButton } from '../BackButton';
import {
  CameraContainer,
  CameraContent,
  ItemsContainer,
  TakePictureIcon,
  GoBack,
  Steps,
  Description,
  DescText,
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
          <Steps>
            <MaterialIcons name="face" size={50} color="white" />
            <FontAwesome
              name="id-card-o"
              size={46}
              color="white"
              style={{ alignSelf: 'flex-start' }}
            />

            <MaterialIcons name="credit-card" size={50} color="white" />
          </Steps>
          <Description>
            <DescText>Centralize o rosto</DescText>
          </Description>
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
  return (
    <ImageBackground
      source={{ uri: photoUri }}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 15,
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={previewVisibilityOnRetake}
            style={{
              width: 130,
              height: 40,

              alignItems: 'center',
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            >
              Re-take
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={stepDone}
            style={{
              width: 130,
              height: 40,

              alignItems: 'center',
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            >
              save photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export { PhotoPreview, TakePicture };
