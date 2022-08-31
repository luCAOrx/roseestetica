import React from 'react'
import { ActivityIndicator } from 'react-native'

import { useCustomTheme } from '../../themes/theme'

export default function Loading() {
  const { colors } = useCustomTheme()

  return (
    <ActivityIndicator
      size="large"
      color={colors.text}
      animating
      style={{ justifyContent: 'center', alignItems: 'center' }}
      testID="loading"
    />
  )
}
