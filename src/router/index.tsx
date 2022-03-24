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

const Stack = createNativeStackNavigator();
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

const Router: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Patios"
          options={{title: 'Pátios'}}
          component={PatiosNavigation}
        />
        <Drawer.Screen name="Clientes" component={ClientesNavigation} />
        <Drawer.Screen
          name="Usuarios"
          options={{title: 'Usuários'}}
          component={UsuariosNavigation}
        />
        <Drawer.Screen name="Rendimentos" component={RendimentosView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Router;
