import React from 'react';
import {StyleSheet, View} from 'react-native';
import InputMask, {MaskInputProps} from 'react-native-mask-input';

interface IInputProps extends Omit<MaskInputProps, 'value'> {
  value?: string;
}

const Input: React.FC<IInputProps> = ({
  value = '',
  onChangeText,
  placeholder,
  mask,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <InputMask
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        mask={mask}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    borderRadius: 22,
    backgroundColor: 'white',
    elevation: 2,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});

export default Input;
