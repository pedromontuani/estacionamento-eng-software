import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const ClientesView: React.FC<{}> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {navigate} = useNavigation();

  const onPressCheckin = () => {
    navigate('CheckinCliente');
  };

  const onPressCheckout = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="CHECK-IN" onPress={onPressCheckin} />
        <Button title="CHECK-OUT" onPress={onPressCheckout} />
      </View>
      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContentContainer}>
                <Text>Check-Out</Text>
                <TextInput placeholder="CPF" />
                <Button title="CONFIRMAR" />
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
