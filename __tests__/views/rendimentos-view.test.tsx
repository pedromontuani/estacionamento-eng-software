import React from 'react';
import {rendererCreate} from '../utils';

import RendimentosView from '../../src/views/rendimentos-view';

describe('Testing users view', () => {
  test('should match snapshot', async () => {
    const tree = rendererCreate(<RendimentosView />);
    expect(tree).toMatchSnapshot();
  });
});
