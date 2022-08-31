import React, { useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useField } from '@unform/core'
import Checkbox from 'expo-checkbox'

import { useCustomTheme } from '../../themes/theme'
import styles from './styles/selectProcedure'

interface CustomCheckboxProps {
  name: string
  procedure: string
  price: string
  id: number
  handleSelectProcedure: (id: number) => void
  selectedProcedure: number[]
}

export default function SelectProcedure({
  name,
  procedure,
  price,
  id,
  handleSelectProcedure,
  selectedProcedure
}: CustomCheckboxProps) {
  const [isChecked, setChecked] = useState(false)

  const { colors } = useCustomTheme()

  const { fieldName, registerField, error } = useField(name)

  const selectProcedureRef = useRef(null)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectProcedureRef.current,
      getValue() {
        return selectedProcedure
      }
    })
  }, [fieldName, selectedProcedure, registerField])

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setChecked(!isChecked)
          handleSelectProcedure(id)
        }}
      >
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          color={colors.primary}
        />
        <Text
          style={[
            styles.text,
            { color: colors.text }
          ]}
        >
          {procedure}
        </Text>
        <Text
          style={[
            styles.price,
            { color: colors.price }
          ]}
        >
          {price}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </>
  )
}
