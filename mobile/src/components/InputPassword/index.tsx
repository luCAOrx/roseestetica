import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

import { ReturnKeyType, StyleSheet, TextInput, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

interface InputPasswordProps {
  placeholder: string;
  returnKeyType: ReturnKeyType; 
  icon: string;
}

export default function InputPassword({ placeholder,  returnKeyType, icon }: InputPasswordProps) {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  
  return (
    <View style={styles.container}>
      <MaterialIcons style={styles.icon} name={icon} size={20} color={'#f0f0f5'} />
      <TextInput 
        style={{flex: 1, color: '#f0f0f5'}}
        placeholder={placeholder}
        placeholderTextColor='#7A7A7A'
        secureTextEntry={visible}
        returnKeyType={returnKeyType}
        autoCorrect={false}
      />
    <BorderlessButton 
      style={styles.iconVisibility} 
      onPress={
        ()=>{
          setShow(!show)
          setVisible(!visible)
        }
      }>
      <MaterialIcons 
        name={show === false ? 'visibility-off' : 'visibility'} 
        size={20} 
        color={show === false ? '#7a7a7a' : '#f0f0f5'} 
      />
    </BorderlessButton>

    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    height: 50,
    margin: 15,

    backgroundColor: '#1e222b',
    borderRadius: 8,

    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    margin: 10,
  },
  iconVisibility: {
    marginRight: 10,
  },
});