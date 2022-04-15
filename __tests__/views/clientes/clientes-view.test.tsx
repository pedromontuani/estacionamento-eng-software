import React from 'react';
import {rendererCreate} from '../../utils';

import ClientsView from '../../../src/views/clientes/clientes-view';

describe('Testing clients view', () => {
  test('should match snapshot', async () => {
    const tree = rendererCreate(<ClientsView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
