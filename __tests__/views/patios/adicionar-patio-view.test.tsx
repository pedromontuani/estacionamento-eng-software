import React from 'react';
import {rendererCreate} from '../../utils';

import AddNewPatio from '../../../src/views/patios/adicionar-patio-view';

describe('Testing add new patio view', () => {
  test('should match snapshot', async () => {
    const tree = rendererCreate(<AddNewPatio />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
