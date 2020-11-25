import React, { useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useField } from '@unform/core';

interface InputProps extends TextInputProps {
  placeholder: string;
  icon: string | any;
  name: string | any;
}

export default function Input({ placeholder, icon, name, ...rest}: InputProps) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  
  const inputRef = useRef<any>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <View style={styles.container}>
      <MaterialIcons style={styles.icon} name={icon} size={20} color={'#333333'} />
      <TextInput 
        ref={inputRef}
        style={{flex: 1}}
        placeholder={placeholder}
        keyboardAppearance="dark"
        placeholderTextColor="#A0A0B2"
        onChangeText={value => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 10
  },
});