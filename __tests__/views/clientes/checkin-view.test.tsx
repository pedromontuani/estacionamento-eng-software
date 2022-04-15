import React from 'react';
import {rendererCreate} from '../../utils';

import CheckinView from '../../../src/views/clientes/checkin-view';

describe('Testing checkin view', () => {
  test('should match snapshot', async () => {
    const tree = rendererCreate(<CheckinView />);
    expect(tree).toMatchSnapshot();
  });
});
