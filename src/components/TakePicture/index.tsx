/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Camera } from 'expo-camera';

import { MaterialIcons } from '@expo/vector-icons';

import {
  CameraContainer,
  CameraContent,
  ItemsContainer,
  TakePictureIcon,
} from './styles';

interface Props {
  onlyType?: 'back' | 'front';
  cameraRef: React.MutableRefObject<any>;
  onTakePicture(): Promise<void>;
}

export function TakePicture({
  onlyType,
  cameraRef,
  onTakePicture,
  ...rest
}: Props) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(0);

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
        style={{ flex: 1 }}
        type={onlyType || type}
        ref={cameraRef}
        autoFocus="on"
        flashMode={flash}
        {...rest}
      >
        <CameraContent>
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
