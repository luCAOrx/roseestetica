import React from 'react';

import { Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation, useTheme } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

import StepIndicator from 'react-native-step-indicator';

import styles from './styles';

interface HeaderProps {
  title: string;
  showIcon: boolean;
  fontSize: number;
  showStep?: boolean;
  position?: number;
}

export default function Header({title, showIcon, fontSize, showStep, position}: HeaderProps) {
  const navigation = useNavigation();

  const {colors} = useTheme();

  return (
    <>
      <View style={styles.container}>
        {
          showIcon ?
          <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
            <MaterialIcons name="arrow-back" size={30} color={colors.text}/>
          </TouchableOpacity> : 
          <View />
        }

        <Text 
          style={[
            styles.title,
            {
              fontSize: fontSize,
              color: colors.text
            }
          ]}
        >
          {title}
        </Text>
        <View />
      </View>
      {
        showStep && 
        <StepIndicator 
          stepCount={3} 
          currentPosition={position}
          customStyles={{
            currentStepLabelColor: colors.currentStepLabelColor,
            stepStrokeCurrentColor: colors.stepStrokeCurrentColor,
            stepIndicatorLabelCurrentColor: colors.stepIndicatorLabelCurrentColor,
            stepIndicatorCurrentColor: colors.stepIndicatorCurrentColor,
            stepIndicatorFinishedColor: colors.stepIndicatorFinishedColor,
            stepIndicatorUnFinishedColor: colors.stepIndicatorUnFinishedColor,
            stepIndicatorLabelFinishedColor: colors.stepIndicatorLabelFinishedColor,
            stepIndicatorLabelUnFinishedColor: colors.stepIndicatorLabelUnFinishedColor,
            separatorFinishedColor: colors.separatorFinishedColor,
            separatorUnFinishedColor: colors.separatorUnFinishedColor
          }}
        />
      }
    </>
  );
}