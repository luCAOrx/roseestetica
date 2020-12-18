import React from 'react';

import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
  title: string;
}

export default function Button({title, ...rest}: ButtonProps) {
  return(
    <RectButton style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
    
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 15,

    backgroundColor: "#3A4498",
    borderRadius: 8,

    justifyContent: "center",
    alignItems: "center",
  },
  
  title: {
    fontFamily: "Roboto_900Black",
    fontSize: 15,
    lineHeight: 18,
    color: "#D2D2E3",
  },
});