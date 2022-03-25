import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store';
import {IUsuario} from '../../types';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getUsuarios,
  REMOVE_USUARIO,
} from '../../store/slices/estacionamento-slice';
import Button from '../../components/Button';
import {RootNavigationScreens} from '../../router';

const UsuariosView: React.FC<{}> = () => {
  const {navigate} = useNavigation<NavigationProp<RootNavigationScreens>>();

  const usuarios = useAppSelector(({estacionamento}) =>
    getUsuarios(estacionamento),
  );
  const dispatch = useAppDispatch();

  const onDeleteUsuario = (usuario: IUsuario) => {
    Alert.alert('Atenção', 'Deseja realmente excluir o usuário?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: () => {
          dispatch(REMOVE_USUARIO(usuario));
        },
      },
    ]);
  };

  const renderItem = ({item}: {item: IUsuario}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text>{item.nome}</Text>
          <Text>{item.tipo}</Text>
        </View>
        <TouchableOpacity onPress={() => onDeleteUsuario(item)}>
          <Icon name="trash" color="#c40a0a" size={25} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  const onPressAdicionarUsuario = () => {
    navigate('AdicionarUsuario');
  };

  return (
    <View style={styles.container}>
      <Button title="Adicionar usuário" onPress={onPressAdicionarUsuario} />
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        data={usuarios}
        keyExtractor={item => item.email}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhum usuário cadastrado</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  flatList: {
    marginHorizontal: -24,
  },
  flatListContent: {
    padding: 24,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 62,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
  },
  itemContent: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  icon: {
    marginRight: 10,
  },
});

export default UsuariosView;
