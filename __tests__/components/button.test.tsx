import React from 'react';
import {rendererCreate} from '../utils';

import Button from '../../src/components/Button';

describe('Testing Button component', () => {
  test('should render correctly', async () => {
    const tree = rendererCreate(<Button title="Teste" onPress={() => {}} />);
    expect(tree).toMatchSnapshot();
  });
});
