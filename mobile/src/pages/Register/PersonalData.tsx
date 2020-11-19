import React from 'react'
import { StyleSheet, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomPicker from '../../components/CustomPicker';
import { ScrollView } from 'react-native-gesture-handler';

export default function PersonalData() {
  const navigation = useNavigation();

  const stepStyles = {
    stepStrokeCurrentColor: "#2FB86E",
    stepIndicatorCurrentColor: "#f0f0f5",
    stepIndicatorFinishedColor: "#2FB86E",
    stepIndicatorUnFinishedColor: "#f0f0f5",
    stepIndicatorLabelFinishedColor: "#161616",
    stepIndicatorLabelUnFinishedColor: "#161616",
    separatorFinishedColor: "#2FB86E",
    separatorUnFinishedColor: "#f0f0f5"
  }

  function handleNavigateToAddress() {
    navigation.navigate('Address');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <StepIndicator stepCount={3} customStyles={stepStyles}/>
        <View style={styles.inputContainer}>
          <Input 
            placeholder="Nome completo"
            icon="person"
            autoCapitalize="words"
            returnKeyType="next"
          />
          <Input 
            placeholder="Cpf"
            icon="fingerprint"
            keyboardType="numeric"
            returnKeyType="next"
            />
          <CustomPicker />
          <Input 
            placeholder="Número de telefone" 
            icon="local-phone" 
            keyboardType="number-pad"
            returnKeyType="next"
          />
          <Input 
            placeholder="Número de celular" 
            icon="phone-android" 
            keyboardType="number-pad"
            returnKeyType="send"
          />
          <Button title="PRÓXIMO" onPress={handleNavigateToAddress} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    marginTop: 40,
  }
});