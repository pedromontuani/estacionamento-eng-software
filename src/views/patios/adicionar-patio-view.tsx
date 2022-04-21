import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View, Alert} from 'react-native';
import uuid from 'react-native-uuid';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RootNavigationScreens} from '../../router';
import {useAppDispatch} from '../../store';
import {ADD_PATIO} from '../../store/slices/estacionamento-slice';

function AdicionarPatioView() {
  const [nome, setNome] = useState<string>();
  const [vagas, setVagas] = useState<string>();
  const [valorHora, setValorHora] = useState<string>();

  const {navigate} = useNavigation<NavigationProp<RootNavigationScreens>>();
  const dispatch = useAppDispatch();

  function onSavePatio() {
    if (nome && vagas && valorHora) {
      dispatch(
        ADD_PATIO({
          nome,
          vagasDisponiveis: parseInt(vagas),
          valorHora: parseInt(valorHora),
          vagasOcupadas: 0,
          id: uuid.v4().toString(),
        }),
      );
      Alert.alert('Sucesso', 'Pátio cadastrado com sucesso', [
        {text: 'OK', onPress: () => navigate('PatiosList')},
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Adicionar novo pátio</Text>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <Input placeholder="Código" value={nome} onChangeText={setNome} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Número de vagas"
            value={vagas?.toString()}
            keyboardType="numeric"
            onChangeText={value => setVagas(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Valor hora"
            keyboardType="numeric"
            value={valorHora?.toString()}
            onChangeText={value => setValorHora(value.replace(',', '.'))}
          />
        </View>
      </View>
      <Button title="Salvar" onPress={onSavePatio} />
    </View>
  );
}

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'stretch',
    padding: 24,
  },
  inputsContainer: {
    paddingVertical: 24,
  },
  inputContainer: {
    paddingVertical: 6,
  },
});

export default AdicionarPatioView as React.FC<{}>;
