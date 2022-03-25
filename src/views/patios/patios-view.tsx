import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../store';
import {IPatio} from '../../types';

import Icon from 'react-native-vector-icons/FontAwesome';
import {getPatios, REMOVE_PATIO} from '../../store/slices/estacionamento-slice';
import Button from '../../components/Button';
import {RootNavigationScreens} from '../../router';

const PatiosView: React.FC<{}> = () => {
  const patios = useAppSelector(({estacionamento}) =>
    getPatios(estacionamento),
  );
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<NavigationProp<RootNavigationScreens>>();

  const onPressPatio = (patio: IPatio) => {
    navigate('CarrosEstacionados', {idPatio: patio.id});
  };

  const onPressAdicionarPatio = () => navigate('AdicionarPatio');

  const onDeletePatio = (patio: IPatio) => {
    Alert.alert('Atenção', 'Deseja realmente excluir o pátio?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: () => {
          dispatch(REMOVE_PATIO(patio));
        },
      },
    ]);
  };

  const renderItem = ({item}: {item: IPatio}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onPressPatio(item)}>
        <View style={styles.itemInfoContainer}>
          <Text>{item.nome}</Text>
          <View style={styles.itemSubInfo}>
            <Text>Vagas disponíveis: {item.vagasDisponiveis}</Text>
            <Text>Vagas ocupadas: {item.vagasOcupadas}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => onDeletePatio(item)}>
          <Icon name="trash" color="#c40a0a" size={25} style={styles.icon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Novo pátio" onPress={onPressAdicionarPatio} />

      <FlatList
        data={patios}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={<Text>Nenhum pátio cadastrado no sistema</Text>}
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
  flatList: {
    marginHorizontal: -24,
  },
  flatListContent: {
    padding: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    height: 92,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
  },
  itemInfoContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  itemSubInfo: {
    flex: 1,
    justifyContent: 'space-around',
  },
  icon: {
    marginRight: 10,
  },
});

export default PatiosView;
