import React, { useEffect, useRef } from 'react'
import { Text } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'

import '../../config/locale'

import { MaterialIcons as Icon } from '@expo/vector-icons'
import { useField } from '@unform/core'

import { useCustomTheme } from '../../themes/theme'
import styles from './styles/selectDate'

interface SelectDateProps {
  name: string
  selectedDay: string
  onDayPress: (day: DateData) => void
}

export default function SelectDate({ name, selectedDay, onDayPress }: SelectDateProps) {
  const { fieldName, registerField, error } = useField(name)

  const { colors } = useCustomTheme()

  const selectDateRef = useRef(null)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectDateRef.current,
      getValue() {
        return selectedDay
      }
    })
  }, [fieldName, selectedDay, registerField])

  return (
    <>
      <Calendar
        theme={{
          calendarBackground: colors.background,
          dayTextColor: colors.text,
          textDisabledColor: colors.border,
          arrowColor: colors.text,
          textSectionTitleColor: colors.text,
          monthTextColor: colors.text,
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
          selectedDayTextColor: colors.background
        }}
        onDayPress={onDayPress}
        renderArrow={(direction = 'left') => (
          <>
            {direction === 'left'
              ? <Icon
                name="navigate-before"
                color={colors.text}
                size={25}
              />
              : <Icon
                name="navigate-next"
                color={colors.text}
                size={25}
              />
            }
          </>
        )}
        markedDates={{
          [selectedDay]: { selected: true, selectedColor: colors.text }
        }}
        hideArrows={true}
        disableMonthChange={true}
        firstDay={7}
        minDate={new Date().toString()}
        disableAllTouchEventsForDisabledDays
      />
      {error && <Text style={styles.errorMessage} testID="selectDateError">{error}</Text>}
    </>
  )
}
