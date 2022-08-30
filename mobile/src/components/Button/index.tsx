import React from 'react'

import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import Loading from '../Loading'

import styles from './styles'

interface CustomButtonProps extends TouchableOpacityProps {
  title: string
  width?: number
  backgroundColor: string
  height: number
  fontSize: number
  marginBottom?: number
  color: string
  borderColor?: string
  borderWidth?: number
  isRequested?: boolean
}

export default function CustomButton({
  title,
  width,
  backgroundColor,
  height,
  fontSize,
  marginBottom,
  color,
  borderColor,
  borderWidth,
  isRequested,
  ...rest
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          height,
          width,
          marginBottom,
          backgroundColor,
          borderColor,
          borderWidth
        }
      ]}
      {...rest}
      testID="button"
    >
      <Text
        style={[
          styles.title,
          {
            fontSize,
            color
          }
        ]}
        testID="text"
      >
        {isRequested ? <Loading /> : title}
      </Text>
    </TouchableOpacity>

  )
}
