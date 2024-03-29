import React, { useEffect, useRef, useState } from 'react'
import { Text, ScrollView, TouchableOpacity, View } from 'react-native'

import { useField } from '@unform/core'

import api from '../../services/api'
import { useCustomTheme } from '../../themes/theme'
import styles from './styles/selectHour'

interface SelectHourProps {
  name: string
  available: string[]
  availableTime: string[]
  selectedDay: string
}

interface Hour {
  id: number
  horario: string
}

export default function SelectHour({ name, available, availableTime, selectedDay }: SelectHourProps) {
  const [hours, setHours] = useState<Hour[]>([])
  const [selectedHour, setSelectedHour] = useState<number[]>([])

  const { colors } = useCustomTheme()

  const { fieldName, registerField, error } = useField(name)

  const selectHourRef = useRef(null)

  function handleSelectHour(id: number) {
    const alreadySelected = selectedHour.findIndex(hour => hour === id)

    if (alreadySelected >= 0) {
      const filteredHours = selectedHour.filter(hour => hour !== id)

      selectedHour.pop()
      setSelectedHour(filteredHours)
    } else {
      setSelectedHour([id])
    }
  }

  useEffect(() => {
    setSelectedHour([])
  }, [selectedDay])

  useEffect(() => {
    api.get('horarios').then(response => {
      setHours(response.data)
    })
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectHourRef.current,
      getValue() {
        return selectedHour
      }
    })
  }, [fieldName, selectedHour, registerField])

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {hours.map(hour => (
          <TouchableOpacity
            key={String(hour.id)}
            disabled={
              available.includes('ocupado') && availableTime.includes(hour.horario)
            }
            style={[
              available.includes('ocupado') && availableTime.includes(hour.horario)
                ? [styles.hour, { backgroundColor: '#c52626' }]
                : styles.hour,
              selectedHour.includes(hour.id) ? styles.selectedHour : {}
            ]}
            onPress={() => handleSelectHour(hour.id)}
            testID="selectHourButton"
          >
            <Text
              style={[
                styles.hourTitle,
                { color: colors.buttonText }
              ]}
            >
              {hour.horario}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {
        error !== 'Você precisa selecionar um horário!'
          ? <View />
          : <Text
            style={styles.errorMessage}
            testID="selectHourError"
          >
            {error}
          </Text>

      }
    </>
  )
}
