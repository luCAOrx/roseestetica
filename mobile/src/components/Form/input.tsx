import React, { useEffect, useRef, useState } from 'react';

import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useField } from '@unform/core';
import { BorderlessButton } from 'react-native-gesture-handler';

interface InputProps extends TextInputProps {
  placeholder: string;
  icon: string;
  name: string;
  isPassword?: boolean;
}

export default function Input({ 
  placeholder, icon, name, isPassword, ...rest
}: InputProps) {
  const [show, setShow] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(true);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  
  const inputRef = useRef<any>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <View style={styles.container}>
      <MaterialIcons style={{margin: 10}} name={icon} size={20} color="#D2D2E3" />
      
      <TextInput 
        ref={inputRef}
        style={{flex: 1, color: "#D2D2E3", height: 50}}
        placeholder={placeholder}
        placeholderTextColor="#7A7A7A"
        secureTextEntry={isPassword ? visiblePassword : !visiblePassword}
        onChangeText={value => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />

      {isPassword ? 
        <BorderlessButton 
          style={{marginRight: 10,}} 
          onPress={() => {
            setShow(!show) 
            setVisiblePassword(!visiblePassword)
          }}
        >
          <MaterialIcons 
            name={show === false ? "visibility-off" : "visibility"} 
            size={20} 
            color={show === false ? "#7A7A7A" : "#D2D2E3"} 
          />
        </BorderlessButton> : []
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    height: 50,
    
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 8,

    backgroundColor: "#222325",
    
  },
});