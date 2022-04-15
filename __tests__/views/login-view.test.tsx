import React from 'react';
import {fireEvent} from '@testing-library/react-native';

import {rendererCreate, customRender} from '../utils';
import * as estacionamentoSlice from '../../src/store/slices/estacionamento-slice';
import LoginView from '../../src/views/login-view';

describe('Testing login view', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should match snapshot', async () => {
    const tree = rendererCreate(<LoginView />);
    expect(tree).toMatchSnapshot();
  });

  test('should sign in', async () => {
    const {findByTestId} = customRender(<LoginView />);
    const emailInput = await findByTestId('email-input');
    const passwordInput = await findByTestId('password-input');
    const signInButton = await findByTestId('sign-in-button');

    const signIn = jest.spyOn(estacionamentoSlice, 'SIGN_IN');

    await fireEvent.changeText(emailInput, 'admin@estacionamento.com');
    await fireEvent.changeText(passwordInput, '123456');
    await fireEvent.press(signInButton);

    expect(signIn).toHaveBeenCalled();
  });

  test('should not sign in', async () => {
    const {findByTestId} = customRender(<LoginView />);
    const emailInput = await findByTestId('email-input');
    const passwordInput = await findByTestId('password-input');
    const signInButton = await findByTestId('sign-in-button');

    const signIn = jest.spyOn(estacionamentoSlice, 'SIGN_IN');

    await fireEvent.changeText(emailInput, 'teste@estacionamento.com');
    await fireEvent.changeText(passwordInput, '123456');
    await fireEvent.press(signInButton);
    expect(signIn).not.toHaveBeenCalled();
  });
});
