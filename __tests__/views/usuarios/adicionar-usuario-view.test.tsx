import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import {rendererCreate, customRender} from '../../utils';
import * as estacionamentoSlice from '../../../src/store/slices/estacionamento-slice';
import AddNewUserView from '../../../src/views/usuarios/adicionar-usuario-view';

const MOCK_EMAIL = 'teste@estacionamento.com';
const MOCK_NAME = 'Teste';
const MOCK_PASSWORD = '123456@';

const MOCK_MANAGER_EMAIL = 'manager@estacionamento.com';
const MOCK_MANAGER_NAME = 'Manager';
const MOCK_MANAGER_PASSWORD = '123456@';

describe('Testing add user view', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should match snapshot', async () => {
    const tree = rendererCreate(<AddNewUserView />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should add new user', async () => {
    const {findByTestId} = customRender(<AddNewUserView />);

    const emailInput = await findByTestId('email-input');
    const nameInput = await findByTestId('name-input');
    const passwordInput = await findByTestId('user-password-input');
    const saveButton = await findByTestId('save-button');

    const addNewUser = jest.spyOn(estacionamentoSlice, 'ADD_USUARIO');

    await fireEvent.changeText(emailInput, MOCK_EMAIL);
    await fireEvent.changeText(nameInput, MOCK_NAME);
    await fireEvent.changeText(passwordInput, MOCK_PASSWORD);
    await fireEvent.press(saveButton);

    expect(addNewUser).toHaveBeenCalled();
  });

  test('should not add new user', async () => {
    const {findByTestId} = customRender(<AddNewUserView />);

    const emailInput = await findByTestId('email-input');
    const nameInput = await findByTestId('name-input');
    const passwordInput = await findByTestId('user-password-input');
    const saveButton = await findByTestId('save-button');

    const addNewUser = jest.spyOn(estacionamentoSlice, 'ADD_USUARIO');

    await fireEvent.changeText(emailInput, '');
    await fireEvent.changeText(nameInput, MOCK_NAME);
    await fireEvent.changeText(passwordInput, MOCK_PASSWORD);
    await fireEvent.press(saveButton);

    expect(addNewUser).not.toHaveBeenCalled();
  });

  test('should add new manager', async () => {
    const {findByTestId} = customRender(<AddNewUserView />);

    const emailInput = await findByTestId('email-input');
    const nameInput = await findByTestId('name-input');
    const passwordInput = await findByTestId('user-password-input');
    const setManagerSwitch = await findByTestId('set-manager-switch');
    const saveButton = await findByTestId('save-button');

    const addNewUser = jest.spyOn(estacionamentoSlice, 'ADD_USUARIO');

    await fireEvent.changeText(emailInput, MOCK_MANAGER_EMAIL);
    await fireEvent.changeText(nameInput, MOCK_MANAGER_NAME);
    await fireEvent.changeText(passwordInput, MOCK_MANAGER_PASSWORD);
    await fireEvent.press(setManagerSwitch);
    await fireEvent.press(saveButton);

    expect(addNewUser).toHaveBeenCalledWith(
      expect.objectContaining({tipo: 'Funcionário(a)'}),
    );
  });
});
