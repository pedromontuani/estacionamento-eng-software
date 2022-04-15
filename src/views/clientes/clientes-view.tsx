import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Button as RNButton,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Masks} from 'react-native-mask-input';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RootNavigationScreens} from '../../router';
import {useAppDispatch, useAppSelector} from '../../store';
import {REMOVE_CLIENTE} from '../../store/slices/estacionamento-slice';
import {ICliente} from '../../types';

const ClientesView: React.FC<{}> = () => {
  const [cpfModalVisible, setCpfModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [cpf, setCpf] = useState<string>();
  const [cliente, setCliente] = useState<ICliente>();
  const [value, setValue] = useState<string>();
  const {navigate} = useNavigation<NavigationProp<RootNavigationScreens>>();

  const {clientes, patios} = useAppSelector(state => state.estacionamento);
  const dispatch = useAppDispatch();

  const onPressCheckin = () => {
    navigate('CheckinCliente');
  };

  const onPressCheckout = () => {
    setCpfModalVisible(true);
  };

  const onConfirmCheckout = () => {
    if (cliente) {
      dispatch(REMOVE_CLIENTE(cliente));
      setConfirmationModalVisible(false);
      Alert.alert('Sucesso', 'Pagamento realizado com sucesso');
    }
  };

  const onPressConfirm = async () => {
    const clienteInstance = clientes.find(c => c.cpf === cpf);
    if (clienteInstance) {
      const patio = patios.find(p => p.id === clienteInstance.idPatio);
      setCliente(clienteInstance);
      setValue(patio?.valorHora?.toFixed(2));
      setConfirmationModalVisible(true);
      setCpfModalVisible(false);
    } else {
      Alert.alert('Erro', 'Cliente não cadastrado');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <RNButton title="CHECK-IN" onPress={onPressCheckin} />
        <RNButton title="CHECK-OUT" onPress={onPressCheckout} />
      </View>
      <Modal
        visible={cpfModalVisible}
        transparent
        onRequestClose={() => setCpfModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setCpfModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContentContainer}>
                <Text>Check-Out</Text>
                <Input
                  placeholder="CPF"
                  keyboardType="numeric"
                  mask={Masks.BRL_CPF}
                  onChangeText={setCpf}
                  value={cpf}
                />
                <Button title="CONFIRMAR" onPress={onPressConfirm} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={confirmationModalVisible}
        transparent
        onRequestClose={() => setConfirmationModalVisible(false)}>
        <TouchableWithoutFeedback
          onPress={() => setConfirmationModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContentContainer}>
                <Text>Valor do estacionamento</Text>
                <Text>R$ {value?.replace('.', ',')}</Text>
                <Button
                  title="CONFIRMAR PAGAMENTO"
                  onPress={onConfirmCheckout}
                />
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
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    justifyContent: 'space-evenly',
    padding: 24,
  },
});

export default ClientesView;
