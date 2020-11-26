import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  placeholder?: string;
  icon?: string | any;
}

export default function Input({ placeholder, icon, ...rest}: InputProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons 
        style={styles.icon} 
        name={icon} 
        size={20} 
        color={'#F2F3F5'} 
      />
      <TextInput 
        style={{flex: 1, color: "#F2F3F5"}}
        placeholder={placeholder}
        placeholderTextColor="#A0A0B2"
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    height: 50,
    backgroundColor: '#222325',
    borderRadius: 8,
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 10
  }
});