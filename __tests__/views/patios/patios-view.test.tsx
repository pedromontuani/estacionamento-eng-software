import React from 'react';
import {rendererCreate} from '../../utils';

import PatiosView from '../../../src/views/patios/patios-view';

describe('Testing patios view', () => {
  test('should match snapshot', async () => {
    const tree = rendererCreate(<PatiosView />);
    expect(tree).toMatchSnapshot();
  });
});
