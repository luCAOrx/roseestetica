import React from 'react'
import { Text, View } from 'react-native'

import { Feather } from '@expo/vector-icons'

import styles from './styles'

interface SucessScreenProps {
  show: boolean
  title: string
}

export function SuccessScreen({ title, show }: SucessScreenProps) {
  return (
    <>
      {
        show
          ? <View style={styles.container} testID="sucessScreenContainer">
            <Feather name="check-circle" color="#34CB79" size={50} />
            <Text style={styles.text} testID="successScreenTitle">{title}</Text>
          </View>
          : null
      }
    </>
  )
}
