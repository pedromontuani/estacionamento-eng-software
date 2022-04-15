import React from 'react';
import {rendererCreate} from '../../utils';

import UsuariosView from '../../../src/views/usuarios/usuarios-view';

describe('Testing users view', () => {
  test('should match snapshot', async () => {
    const tree = rendererCreate(<UsuariosView />);
    expect(tree).toMatchSnapshot();
  });
});
