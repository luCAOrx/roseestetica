import React from 'react';

import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

interface CustomButtonProps extends RectButtonProperties {
  title: string;
  width?: number;
  backgroundColor: string;
  height: number;
  fontSize: number;
  marginBottom?: number;
}

export default function CustomButton({
  title, 
  width, 
  backgroundColor, 
  height,
  fontSize,
  marginBottom,
  ...rest
}: CustomButtonProps) {
  const styles = StyleSheet.create({
    container: {
      height: height,
      margin: 15,
      width: width,
      marginBottom: marginBottom,
  
      backgroundColor: backgroundColor,
      borderRadius: 8,
  
      justifyContent: "center",
      alignItems: "center",
    },
    
    title: {
      fontFamily: "Roboto_900Black",
      fontSize: fontSize,
      lineHeight: 18,
      color: "#D2D2E3",
    },
  });
  
  return(
    <RectButton style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
    
  );
}
