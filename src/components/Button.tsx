import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface IButtonProps {
  title: string;
  onPress(): void;
}

const Button: React.FC<IButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
});

export default Button;
