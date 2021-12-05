/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import Slider from '@react-native-community/slider';
import {
  useFocusEffect,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import axios from 'axios';
import { useTheme } from 'styled-components';

import Announcement from '../../components/Announcement';
import { CustomSlider } from '../../components/CustomSlider';
import { InputPicker } from '../../components/Inputs/InputPicker';
import { Load } from '../../components/Load';
import { SearchBar } from '../../components/Search';
import { Params } from '../../dtos/request/AnnouncementRequestDTO';
import { AnnouncementResponse } from '../../dtos/response/AnnouncementResponseDTO';
import {
  CategoryResponse,
  Type,
} from '../../dtos/response/CategoryResponseDTO';
import AnnouncementApi from '../../services/api/AnnouncementApi';
import CategoryApi from '../../services/api/CategoryApi';
import { convertToSlug } from '../../utils/Regex';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { InputPrice } from '../AddAnnouncement/styles';
import {
  Container,
  Header,
  HeaderContent,
  IconsContainer,
  Like,
  Filter,
  AnnouncementList,
  TextEndItems,
  FiltersButtons,
  FiltersContent,
  FiltersTitle,
  FilterText,
} from './styles';
import StateApi from '../../services/api/StateApi';
import { StatesResponse } from '../../dtos/response/StateResponseDTO';
import { CityResponse } from '../../dtos/response/CityResponseDTO';

const wait = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function Home() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [announcements, setAnnouncements] = useState<AnnouncementResponse[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [initialMount, setInitialMount] = useState(true);
  const [params, setParams] = useState<Params>({ page: 1 } as Params);
  const [endItems, setEndItems] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [filtersScreen, setFiltersScreen] = useState(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [states, setStates] = useState<StatesResponse[]>([]);
  const [cities, setCities] = useState<CityResponse[]>([]);

  const handleChangeParams = (name, value) => {
    setParams(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    setAnnouncements([]);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  function loadMore() {
    if (endItems) {
      return <TextEndItems>Não há mais anúncios</TextEndItems>;
    }
    return <Load />;
  }

  function handleAnnouncementDetails(ad: AnnouncementResponse) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AnnouncementDetails',
        params: {
          ad,
        },
      }),
    );
  }

  const handleSearch = (s: string) => {
    setAnnouncements([]);
    handleChangeParams('page', 1);
    handleChangeParams('name', s);
  };

  const handleEndReached = () => {
    if (!endItems) {
      handleChangeParams('page', params.page + 1);
    }
  };

  useEffect(() => {
    async function getCategories() {
      CategoryApi.all()
        .then(categoryResponse => {
          setCategories(categoryResponse.data);
        })
        .catch(error => {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    }

    getCategories();
  }, []);

  useEffect(() => {
    async function getStates() {
      StateApi.all()
        .then(response => setStates(response.data))
        .catch(error => console.log(error.response));
    }

    getStates();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      async function getCitiesByState() {
        if (params.state) {
          StateApi.find(params.state)
            .then(response => setCities(response.data.cities))
            .catch(error => console.log(error.response));
        }
      }

      getCitiesByState();

      return () => setCities([]);
    }, [params.state]),
  );

  useFocusEffect(
    React.useCallback(() => {
      async function getTypesByCategory() {
        if (params.category) {
          const category = categories.find(item => item.id === params.category);
          setTypes(category.types);
        }
      }

      getTypesByCategory();

      return () => setTypes([]);
    }, [params.category]),
  );

  useFocusEffect(
    React.useCallback(() => {
      async function getAnnouncements() {
        if (!initialMount) {
          setLoading(true);
          AnnouncementApi.all(params)
            .then(response => {
              setAnnouncements([...announcements, ...response.data.data]);

              if (response.data.next_page_url === null) {
                setEndItems(true);
              } else {
                setEndItems(false);
              }
            })
            .catch(error => console.log(error.response))
            .finally(() => setLoading(false));
        } else {
          setInitialMount(false);
        }
      }

      getAnnouncements();

      return () => {
        setAnnouncements([]);
        axios.CancelToken.source().cancel();
      };
    }, [params.page]),
  );

  useFocusEffect(
    React.useCallback(() => {
      async function getAnnouncements() {
        setLoading(true);

        if (refreshing) {
          setParams({ page: 1 });
        } else {
          handleChangeParams('page', 1);
        }

        AnnouncementApi.all(params)
          .then(response => setAnnouncements(response.data.data))
          .catch(error => console.log(error.response))
          .finally(() => setLoading(false));
      }

      getAnnouncements();

      return () => {
        setAnnouncements([]);
        axios.CancelToken.source().cancel();
      };
    }, [
      params.name,
      params.priceTo,
      params.priceFrom,
      params.category,
      params.type,
      params.city,
      refreshing,
    ]),
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <SearchBar
            platform="ios"
            placeholder="Procurar"
            onCancel={() => setRefreshing(true)}
            onChangeText={text => handleSearch(text)}
            value={params.name}
          />

          <IconsContainer>
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'AnnouncementSaved',
                  }),
                )
              }
            >
              <Like name="favorite-border" size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setFiltersScreen(!filtersScreen)}
            >
              <Filter name="filter-outline" size={24} />
            </TouchableOpacity>
          </IconsContainer>
        </HeaderContent>
      </Header>

      {!filtersScreen ? (
        loading ? (
          <Load />
        ) : (
          <AnnouncementList
            data={announcements}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Announcement
                data={item}
                onPress={() => handleAnnouncementDetails(item)}
                iconActive
              />
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0}
            ListFooterComponent={!loading ? loadMore : null}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors.green_linear_dark_opaque}
                colors={[theme.colors.green_linear_dark_opaque]}
              />
            }
          />
        )
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FiltersContent>
            <FiltersTitle>Categoria</FiltersTitle>
            <FiltersButtons>
              <InputPicker
                selectedValue={params.category}
                onValueChange={value => handleChangeParams('category', value)}
                labelDisable="Escolha uma categoria"
                items={
                  categories
                    ? categories.map(item => {
                        return { label: item.name, value: item.id };
                      })
                    : []
                }
              />
            </FiltersButtons>

            <FiltersTitle>Tipo</FiltersTitle>
            <FiltersButtons>
              <InputPicker
                selectedValue={params.type}
                onValueChange={value => handleChangeParams('type', value)}
                labelDisable="Escolha um tipo"
                items={
                  types
                    ? types.map(item => {
                        return { label: item.name, value: item.id };
                      })
                    : []
                }
              />
            </FiltersButtons>

            <FiltersTitle>Estado</FiltersTitle>
            <FiltersButtons>
              <InputPicker
                selectedValue={params.state}
                onValueChange={value => handleChangeParams('state', value)}
                labelDisable="Escolha um estado"
                items={
                  states
                    ? states.map(item => {
                        return { label: item.name, value: item.id };
                      })
                    : []
                }
              />
            </FiltersButtons>

            <FiltersTitle>Cidade</FiltersTitle>
            <FiltersButtons>
              <InputPicker
                selectedValue={params.city}
                onValueChange={value => handleChangeParams('city', value)}
                labelDisable={
                  cities.length === 0
                    ? 'Escolha um estado primeiro'
                    : 'Escolha um estado'
                }
                items={
                  cities
                    ? cities.map(item => {
                        return { label: item.name, value: item.id };
                      })
                    : []
                }
              />
            </FiltersButtons>

            <FiltersTitle>Valor</FiltersTitle>
            <InputPrice
              type="money"
              value={params.priceFrom === undefined ? '0' : params.priceFrom}
              maxLength={13}
              options={{
                unit: 'R$ ',
              }}
              includeRawValueInChangeText
              onChangeText={(maskedText, rawText) =>
                handleChangeParams('priceFrom', rawText)
              }
            />

            <FiltersTitle>até</FiltersTitle>
            <InputPrice
              type="money"
              value={params.priceTo === undefined ? '0' : params.priceTo}
              maxLength={13}
              options={{
                unit: 'R$ ',
              }}
              includeRawValueInChangeText
              onChangeText={(maskedText, rawText) =>
                handleChangeParams('priceTo', rawText)
              }
            />
          </FiltersContent>
        </ScrollView>
      )}
    </Container>
  );
}
