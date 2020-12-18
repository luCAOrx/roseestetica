import React, { useState } from 'react'

import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';

interface InputPasswordProps extends TextInputProps {
  placeholder: string;
  icon: string;
}

export default function InputPassword({ 
  placeholder, 
  icon,
  ...rest 
}: InputPasswordProps) {
  const [show, setShow] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  
  return (
    <View style={styles.container}>
      <MaterialIcons 
        style={{margin: 10,}} 
        name={icon} 
        size={20} 
        color="#D2D2E3"
      />

      <TextInput 
        style={{flex: 1, color: "#D2D2E3"}}
        placeholder={placeholder}
        placeholderTextColor="#7A7A7A"
        keyboardAppearance="dark"
        secureTextEntry={visiblePassword}
        {...rest}
      />
      
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
      </BorderlessButton>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    height: 50,
    margin: 15,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 8,

    backgroundColor: "#222325",
  },
});