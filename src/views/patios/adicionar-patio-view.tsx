import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
const AdicionarPatioView: React.FC<{}> = () => {
  const {navigate} = useNavigation();

  const onPressSave = () => {
    navigate('PatiosList');
  };

  return (
    <View style={styles.container}>
      <Text>Adicionar novo pátio</Text>
      <TextInput placeholder="Nome" />
      <TextInput placeholder="Número de vagas" />
      <TextInput placeholder="Valor hora" />

      <Button title="Salvar" onPress={onPressSave} />
    </View>
  );
};

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'stretch',
    padding: 24,
  },
});

export default AdicionarPatioView;
