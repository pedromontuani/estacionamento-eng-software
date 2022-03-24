import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
const CheckinView: React.FC<{}> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {navigate} = useNavigation();

  const onPressSave = () => {
    setModalVisible(true);
  };

  const onPressOk = () => {
    setModalVisible(false);
    navigate('ClientesView');
  };

  return (
    <View style={styles.container}>
      <Text>Check-in do cleinte</Text>
      <TextInput placeholder="CPF" />
      <TextInput placeholder="Placa" />
      <TextInput placeholder="Modelo" />
      <TextInput placeholder="Cor do veículo" />

      <Button title="Salvar" onPress={onPressSave} />
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
                  <Text>Pátio 1</Text>
                  <Text>Vaga 02</Text>
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
});

export default CheckinView;
