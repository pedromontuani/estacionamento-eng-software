import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Button, FlatList, Text} from 'react-native';

const USUARIOS = [{}, {}, {}];

const UsuariosView: React.FC<{}> = () => {
  const {navigate} = useNavigation();

  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.itemContainer}>
        <Text>Maria</Text>
        <Text>Atendente</Text>
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
        data={USUARIOS}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
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
    height: 62,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    alignItems: 'stretch',
    padding: 12,
    marginBottom: 12,
    justifyContent: 'space-around',
  },
});

export default UsuariosView;
