import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

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
        style={styles.icon} 
        name={icon} 
        size={20} 
        color={'#333333'} 
      />
      <TextInput 
        style={{flex: 1}}
        placeholder={placeholder}
        placeholderTextColor='#A0A0B2'
        keyboardAppearance="dark"
        secureTextEntry={visiblePassword}
        {...rest}
      />
      <BorderlessButton 
        style={styles.iconVisibility} 
        onPress={() => {
          setShow(!show) 
          setVisiblePassword(!visiblePassword)
        }}
      >
        <MaterialIcons 
          name={show === false ? 'visibility-off' : 'visibility'} 
          size={20} 
          color={show === false ? '#A0A0B2' : '#333333'} 
        />
      </BorderlessButton>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    height: 50,
    margin: 15,

    backgroundColor: '#fff',
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