import React, { useState } from 'react';
import { Image as Images, ScrollView, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import ButtonGradient from '../../components/ButtonGradient';
import { Checkbox } from '../../components/Checkbox';
import { InputPicker } from '../../components/Inputs/InputPicker';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  ContainerContent,
  Header,
  HeaderContent,
  BackButton,
  HeaderTitle,
  Image,
  TextImage,
  CountImage,
  Title,
  InputTitle,
  InputDescription,
} from './styles';

export function AddAnnouncement() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [images, setImages] = useState('');

  function handleBack() {
    navigation.goBack();
  }

  async function handleSelectPhotos() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // allowsMultipleSelection: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (result.cancelled === false) {
      setImages(result.uri);
    } else {
      return;
    }
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>Inserir Anúncio</HeaderTitle>
        </HeaderContent>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ContainerContent>
          <Image activeOpacity={0.7} onPress={() => handleSelectPhotos()}>
            <MaterialIcons
              name="add-a-photo"
              size={32}
              color={theme.colors.green_dark_3}
            />
            <TextImage>Adicionar Fotos</TextImage>
            <CountImage>0 / 6 Fotos</CountImage>
          </Image>

          <View
            style={{
              width: 180,
              height: 180,

              marginTop: 48,
              backgroundColor: theme.colors.gray_background,
            }}
          >
            {!!images && (
              <Images
                source={{ uri: images }}
                style={{
                  width: 180,
                  height: 180,
                }}
              />
            )}
          </View>

          <Title>Título do Anúncio *</Title>
          <InputTitle
            placeholder="Ex: Trator Novo"
            placeholderTextColor={theme.colors.input_text}
          />

          <Title>Descrição *</Title>
          <InputDescription
            multiline
            style={{ textAlignVertical: 'top' }}
            numberOfLines={8}
            underlineColorAndroid="transparent"
            placeholder="Ex: Trator novo com vistoria em dia, motor bom, pneus bons, ótimo para plantio de soja."
            placeholderTextColor={theme.colors.input_text}
          />

          <Title>Categoria *</Title>
          <InputPicker
            selectedValue={selectedCategory}
            onValueChange={(itemValue: string, itemIndex) =>
              setSelectedCategory(itemValue)
            }
            labelDisable="Selecione uma categoria"
            items={[
              { label: 'Trator', value: 'trator' },
              { label: 'Tobata', value: 'tobata' },
              { label: 'Colheitadeira', value: 'colheitadeira' },
            ]}
          />

          <Title>Tipo *</Title>
          <InputPicker
            selectedValue={selectedType}
            onValueChange={(itemValue: string, itemIndex) =>
              setSelectedType(itemValue)
            }
            labelDisable="Selecione um tipo"
            items={[
              { label: 'Tipo 1', value: 'tipo1' },
              { label: 'Tipo 2', value: 'tipo2' },
              { label: 'Tipo 3', value: 'tipo3' },
            ]}
          />

          <Checkbox
            text="Preciso de transporte para este anúncio"
            style={{ marginTop: 20 }}
          />

          <Checkbox
            text="Exibir meu telefone neste anúncio"
            style={{ marginBottom: 40 }}
          />

          <ButtonGradient title="Anunciar já" />
        </ContainerContent>
      </ScrollView>
    </Container>
  );
}
