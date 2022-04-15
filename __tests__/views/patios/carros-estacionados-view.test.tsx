import React from 'react';
import * as ReactNavigation from '@react-navigation/native';
import {rendererCreate} from '../../utils';

import ParkedCarsView from '../../../src/views/patios/carros-estacionados-view';

describe('Testing parked cars view', () => {
  beforeEach(() => {
    const useRoute = jest.spyOn(ReactNavigation, 'useRoute');
    // @ts-ignore
    useRoute.mockImplementationOnce(() => ({
      params: {patio: {id: 1, nome: 'Patio 1'}},
    }));
  });

  test('should match snapshot', async () => {
    const tree = rendererCreate(<ParkedCarsView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
