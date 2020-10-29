import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { BaseButtonProperties, RectButton } from 'react-native-gesture-handler';

interface ButtonProps extends BaseButtonProperties {
  title: string;
  onPress?: (pointerInside: boolean) => void;
}

export default function Button({title, onPress}: ButtonProps) {
  return(
    <RectButton style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
    
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 15,

    backgroundColor: '#3A4498',
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto_900Black',
    fontSize: 15,
    lineHeight: 18,
    color: '#f0f0f5',
  },
});