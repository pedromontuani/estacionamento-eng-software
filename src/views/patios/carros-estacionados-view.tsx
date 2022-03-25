import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {RouteProp, useRoute} from '@react-navigation/native';
import {useAppSelector} from '../../store';
import {ICliente} from '../../types';
import {
  getCarrosByIdPatio,
  getPatioById,
} from '../../store/slices/estacionamento-slice';
import {RootNavigationScreens} from '../../router';

const CarrosEstacionadosView: React.FC<{}> = () => {
  const {
    params: {idPatio},
  } = useRoute<RouteProp<RootNavigationScreens, 'CarrosEstacionados'>>();

  const carros = useAppSelector(({estacionamento}) =>
    getCarrosByIdPatio(estacionamento, idPatio),
  );
  const patio = useAppSelector(({estacionamento}) =>
    getPatioById(estacionamento, idPatio),
  );

  const renderItem = ({item}: {item: ICliente}) => {
    return (
      <View style={styles.itemContainer}>
        <Text>
          {item.modelo} - {item.cor}
        </Text>
        <Text>{item.placa}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Carros estacionados em: {patio?.nome}</Text>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.flatList}
        data={carros}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 24,
  },
  list: {marginHorizontal: -24},
  flatList: {
    padding: 12,
  },
  itemContainer: {
    flex: 1,
    height: 72,
    maxWidth: 170,
    padding: 12,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 5,
    margin: 12,
  },
});

export default CarrosEstacionadosView;
