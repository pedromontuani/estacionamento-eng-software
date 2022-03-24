import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const CARROS = [{}, {}, {}];

const CarrosEstacionadosView: React.FC<{}> = () => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text>Carro tal</Text>
        <Text>HXN-2323</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Carros estacionados em: Pátio A</Text>
      <FlatList
        style={{marginHorizontal: -24}}
        contentContainerStyle={styles.flatList}
        data={CARROS}
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
