import React from 'react';
import { KeyboardType, ReturnKeyType, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  placeholder: string;
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;
  icon: string;
}

export default function Input({ placeholder, keyboardType, returnKeyType, icon }: InputProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons style={styles.icon} name={icon} size={20} color={'#f0f0f5'} />
      <TextInput 
        style={{flex: 1, color: '#f0f0f5'}}
        placeholder={placeholder}
        autoCorrect={false}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        keyboardAppearance='dark'
        placeholderTextColor='#7A7A7A'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    height: 50,
    backgroundColor: '#1e222b',
    borderRadius: 8,
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 10
  },
});