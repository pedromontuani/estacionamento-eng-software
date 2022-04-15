import React, {useState} from 'react';
import {Dimensions, View, StyleSheet, Alert} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store';
import {
  findUsuarioByEmailAndPassoword,
  getAllUsuarios,
  SIGN_IN,
} from '../store/slices/estacionamento-slice';

import Button from '../components/Button';
import Input from '../components/Input';

const LoginView: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();

  const usuarios = useAppSelector(({estacionamento}) =>
    getAllUsuarios(estacionamento),
  );
  const dispatch = useAppDispatch();

  const onSubmitLogin = async () => {
    if (email && senha) {
      const usuario = findUsuarioByEmailAndPassoword(usuarios, email, senha);
      if (usuario) {
        dispatch(SIGN_IN(usuario));
      } else {
        Alert.alert('Erro', 'Usuário ou senha inválidos');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentOuter}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Button title="LOGIN" onPress={onSubmitLogin} />
      </View>
    </View>
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentOuter: {
    height: height * 0.3,
    width: width * 0.75,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 5,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    marginBottom: 180,
  },
});

export default LoginView;
