import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View, Switch, Alert} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RootNavigationScreens} from '../../router';
import {useAppDispatch} from '../../store';
import {ADD_USUARIO} from '../../store/slices/estacionamento-slice';

const AdicionarUsuarioView: React.FC<{}> = () => {
  const [nome, setNome] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [senha, setSenha] = useState<string>();
  const {navigate} = useNavigation<NavigationProp<RootNavigationScreens>>();

  const dispatch = useAppDispatch();

  const onSaveUsuario = () => {
    if (nome && email && senha) {
      dispatch(
        ADD_USUARIO({
          nome,
          email,
          senha,
          tipo: isAdmin ? 'Administrador' : 'Funcionário(a)',
        }),
      );

      Alert.alert('Sucesso', 'Usuário adicionado com sucesso', [
        {
          text: 'OK',
          onPress: () => {
            navigate('UsuariosList');
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Adicionar novo usuário</Text>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <Input
            testID="name-input"
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            testID="email-input"
            placeholder="Email"
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            testID="user-password-input"
            secureTextEntry
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.adminContainer}>
            <Text>Usuário gerente?</Text>
            <Switch
              testID="set-manager-switch"
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isAdmin ? '#1976d2' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsAdmin}
              value={isAdmin}
            />
          </View>
        </View>
      </View>

      <Button testID="save-button" title="Salvar" onPress={onSaveUsuario} />
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
  adminContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputsContainer: {
    paddingVertical: 24,
  },
  inputContainer: {
    paddingVertical: 6,
  },
});

export default AdicionarUsuarioView;
