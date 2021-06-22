import React from 'react';

import { Text, TouchableOpacityProps } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  width?: number;
  backgroundColor: string;
  height: number;
  fontSize: number;
  marginBottom?: number;
  color: string;
}

export default function CustomButton({
  title, 
  width, 
  backgroundColor, 
  height,
  fontSize,
  marginBottom,
  color,
  ...rest
}: CustomButtonProps) {
  return(
    <TouchableOpacity 
      style={[
        styles.container,
        {
          height: height,
          width: width,
          marginBottom: marginBottom,
          backgroundColor: backgroundColor
        }
      ]} 
      {...rest}
    >
      <Text 
        style={[
          styles.title,
          {
            fontSize: fontSize,
            color: color
          }
        ]}
      >
        {title}
        </Text>
    </TouchableOpacity>
    
  );
}