import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Masks} from 'react-native-mask-input';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RootNavigationScreens} from '../../router';
import {useAppDispatch, useAppSelector} from '../../store';
import {ADD_CLIENTE, getPatios} from '../../store/slices/estacionamento-slice';
import {ICliente, IPatio} from '../../types';
const CheckinView: React.FC<{}> = () => {
  const [patio, setPatio] = useState<IPatio>();
  const [cpf, setCpf] = useState<string>();
  const [placa, setPlaca] = useState<string>();
  const [modelo, setModelo] = useState<string>();
  const [cor, setCor] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);
  const {navigate} = useNavigation<NavigationProp<RootNavigationScreens>>();

  const patios = useAppSelector(({estacionamento}) =>
    getPatios(estacionamento),
  );

  const dispatch = useAppDispatch();

  const onCheckinConfirm = async () => {
    if (patios.length > 0) {
      if (cpf && placa && modelo && cor) {
        const availablePatio = patios.filter(
          p => p.vagasDisponiveis > p.vagasOcupadas,
        )?.[0];
        if (!availablePatio) {
          return Alert.alert('Erro', 'Não há vagas disponíveis');
        }
        const newCliente: ICliente = {
          cpf,
          placa,
          modelo,
          cor,
          idPatio: availablePatio.id,
          horaEntrada: Date.now(),
        };
        dispatch(
          ADD_CLIENTE({idPatio: availablePatio.id, cliente: newCliente}),
        );
        setPatio({
          ...availablePatio,
          vagasOcupadas: availablePatio.vagasOcupadas + 1,
        });
        setModalVisible(true);
      }
    } else {
      Alert.alert('Erro', 'Não há pátios cadastrados');
    }
  };

  const onPressOk = () => {
    navigate('ClientesView');
  };

  return (
    <View style={styles.container}>
      <Text>Check-in do cleinte</Text>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="CPF"
            keyboardType="numeric"
            value={cpf}
            mask={Masks.BRL_CPF}
            onChangeText={setCpf}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input placeholder="Placa" value={placa} onChangeText={setPlaca} />
        </View>
        <View style={styles.inputContainer}>
          <Input placeholder="Modelo" value={modelo} onChangeText={setModelo} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Cor do veículo"
            value={cor}
            onChangeText={setCor}
          />
        </View>
      </View>

      <Button title="Salvar" onPress={onCheckinConfirm} />
      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContentContainer}>
                <Text>Comprovante de estacionamento</Text>
                <View style={styles.modalInnerContainer}>
                  <Text>{patio?.nome}</Text>
                  <Text>Vaga {patio?.vagasOcupadas}</Text>
                </View>
                <Button title="OK" onPress={onPressOk} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  modalContainer: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentContainer: {
    height: HEIGHT * 0.3,
    width: WIDTH * 0.8,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 24,
  },
  modalInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  inputsContainer: {
    paddingVertical: 24,
  },
  inputContainer: {
    paddingVertical: 6,
  },
});

export default CheckinView;
