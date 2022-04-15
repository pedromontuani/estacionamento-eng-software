import React from 'react';
import {rendererCreate} from '../../utils';

import CheckinView from '../../../src/views/clientes/checkin-view';

describe('Testing clients view', () => {
  test('should match snapshot', async () => {
    const tree = rendererCreate(<CheckinView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
