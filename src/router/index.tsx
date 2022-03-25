import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PatiosView from '../views/patios/patios-view';
import ClientesView from '../views/clientes/clientes-view';
import UsuariosView from '../views/usuarios/usuarios-view';
import RendimentosView from '../views/rendimentos-view';
import AdicionarPatioView from '../views/patios/adicionar-patio-view';
import CarrosEstacionadosView from '../views/patios/carros-estacionados-view';
import CheckinView from '../views/clientes/checkin-view';
import AdicionarUsuarioView from '../views/usuarios/adicionar-usuario-view';
import LoginView from '../views/login-view';
import {useAppDispatch, useAppSelector} from '../store';

import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SIGN_OUT} from '../store/slices/estacionamento-slice';

export type RootNavigationScreens = {
  PatiosList: undefined;
  AdicionarPatio: undefined;
  CarrosEstacionados: {idPatio: string};
  ClientesView: undefined;
  CheckinCliente: undefined;
  UsuariosList: undefined;
  AdicionarUsuario: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootNavigationScreens>();
const Drawer = createDrawerNavigator();

const PatiosNavigation: React.FC<{}> = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PatiosList" component={PatiosView} />
      <Stack.Screen name="AdicionarPatio" component={AdicionarPatioView} />
      <Stack.Screen
        name="CarrosEstacionados"
        component={CarrosEstacionadosView}
      />
    </Stack.Navigator>
  );
};

const ClientesNavigation: React.FC<{}> = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ClientesView" component={ClientesView} />
      <Stack.Screen name="CheckinCliente" component={CheckinView} />
    </Stack.Navigator>
  );
};

const UsuariosNavigation: React.FC<{}> = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UsuariosList" component={UsuariosView} />
      <Stack.Screen name="AdicionarUsuario" component={AdicionarUsuarioView} />
    </Stack.Navigator>
  );
};

const RightIcon: React.FC<{}> = () => {
  const styles = StyleSheet.create({
    container: {
      marginRight: 20,
    },
  });

  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch(SIGN_OUT())}>
      <Icon name="sign-out" size={25} color="#444" />
    </TouchableOpacity>
  );
};

const Router: React.FC<{}> = () => {
  const usuarioLogado = useAppSelector(
    state => state.estacionamento.usuarioLogado,
  );

  return (
    <NavigationContainer>
      {usuarioLogado ? (
        <Drawer.Navigator
          screenOptions={{
            headerRight: () => <RightIcon />,
          }}>
          {usuarioLogado.tipo === 'Administrador' && (
            <Drawer.Group>
              <Drawer.Screen
                name="Patios"
                options={{title: 'Pátios'}}
                component={PatiosNavigation}
              />
              <Drawer.Screen
                name="Usuarios"
                options={{title: 'Usuários'}}
                component={UsuariosNavigation}
              />
              <Drawer.Screen name="Rendimentos" component={RendimentosView} />
            </Drawer.Group>
          )}
          <Drawer.Screen name="Clientes" component={ClientesNavigation} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginView} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Router;
