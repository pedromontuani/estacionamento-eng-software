import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface IPatio {
  id: number;
  nome: string;
  vagasDisponiveis: number;
  vagasOcupadas: number;
}

const PATIOS: IPatio[] = [
  {
    id: 1,
    nome: 'Pátio A',
    vagasDisponiveis: 10,
    vagasOcupadas: 15,
  },
  {
    id: 2,
    nome: 'Pátio B',
    vagasDisponiveis: 10,
    vagasOcupadas: 15,
  },
];

const PatiosView: React.FC<{}> = () => {
  const {navigate} = useNavigation();

  const onPressPatio = (patio: IPatio) => {
    navigate('CarrosEstacionados', patio);
  };

  const onPressAdicionarPatio = () => navigate('AdicionarPatio');

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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Novo pátio" onPress={onPressAdicionarPatio} />

      <FlatList
        data={PATIOS}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
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
    alignItems: 'stretch',
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
});

export default PatiosView;
