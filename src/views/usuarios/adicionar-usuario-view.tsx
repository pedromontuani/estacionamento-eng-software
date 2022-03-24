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
const AdicionarUsuarioView: React.FC<{}> = () => {
  const {navigate} = useNavigation();

  const onPressSave = () => {
    navigate('UsuariosView');
  };

  return (
    <View style={styles.container}>
      <Text>Adicionar novo usuário</Text>
      <TextInput placeholder="Nome" />
      <TextInput placeholder="Tipo" />
      <TextInput placeholder="Senha" />

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

export default AdicionarUsuarioView;
