import React from 'react';
import {rendererCreate, customRender} from '../utils';
import {fireEvent} from '@testing-library/react-native';

import Input from '../../src/components/Input';

describe('Testing Input component', () => {
  test('should render correctly', async () => {
    const tree = rendererCreate(
      <Input value="" onChangeText={() => {}} />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('should read an input', async () => {
    let value = '';
    const onChangeText = jest.fn().mockImplementation(text => {
      value = text;
    });
    const {getByTestId} = customRender(
      <Input testID="input-test" value={value} onChangeText={onChangeText} />,
    );

    const input = await getByTestId('input-test');

    const MOCK_TEXT = 'a';
    await fireEvent.changeText(input, MOCK_TEXT);

    expect(onChangeText).toHaveBeenCalled();
    expect(value).toBe(MOCK_TEXT);
  });
});
