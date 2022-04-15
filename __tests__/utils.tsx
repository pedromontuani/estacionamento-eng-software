import React from 'react';
import {render, RenderAPI, RenderOptions} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import renderer, {ReactTestRenderer} from 'react-test-renderer';
import {Provider} from 'react-redux';
import {store} from '../src/store';

interface IAllThemeProviders {
  children: React.ReactElement;
}

const Providers = ({children}: IAllThemeProviders) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </Provider>
  );
};

export const customRender = (
  ui: React.ReactElement,
  options = {} as RenderOptions,
): RenderAPI => {
  return render(ui, {wrapper: Providers, ...options});
};

export const rendererCreate = (
  component: React.ReactElement,
): ReactTestRenderer => {
  return renderer.create(<Providers>{component}</Providers>);
};
