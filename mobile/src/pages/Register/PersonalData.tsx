import React, { useEffect, useRef } from 'react'

import { BackHandler, Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import StepIndicator from 'react-native-step-indicator';

import { Input, Select } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import Header from '../../components/Header';

export default function PersonalData() {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Login");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  function handleNavigateToAddress() {
    navigation.navigate("Address");
  }

  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <Form style={styles.form} ref={formRef} onSubmit={handleSubmit}>
      <Header title="Dados pessoais" showIcon={false} fontSize={26}/>
      <StepIndicator stepCount={3} customStyles={stepStyles}/>
      <View style={{marginTop: 20}}/>
      <Input 
        placeholder="Nome completo"
        icon="person"
        autoCapitalize="words"
        returnKeyType="next"
        name="nome"
      />

      <Input 
        placeholder="Cpf"
        icon="fingerprint"
        keyboardType="numeric"
        returnKeyType="next"
        name="cpf"
      />

      <Select 
        icon="face" 
        name="sexo"
        placeholder="Sexo" 
        modalHeight={190} 
        snapPoint={190}
        isGender
      />

      <Input 
        placeholder="Número de telefone" 
        icon="local-phone" 
        keyboardType="number-pad"
        returnKeyType="next"
        name="telefone"
      />
      
      <Input 
        placeholder="Número de celular" 
        icon="phone-android" 
        keyboardType="number-pad"
        returnKeyType="send"
        name="celular"
      />

      <CustomButton 
        title="PRÓXIMO" 
        backgroundColor="#3A4498"
        height={50}
        marginBottom={50}
        fontSize={15}
        onPress={() => {
          formRef.current?.submitForm();
          handleNavigateToAddress();
        }} 
      />
    </Form>
  );
}

const stepStyles = {
  currentStepLabelColor: "#333333",
  
  stepStrokeCurrentColor: "#2FB86E",

  stepIndicatorLabelCurrentColor: "#333333",
  stepIndicatorCurrentColor: "#D2D2E3",
  stepIndicatorFinishedColor: "#2FB86E",
  stepIndicatorUnFinishedColor: "#D2D2E3",
  stepIndicatorLabelFinishedColor: "#333333",
  stepIndicatorLabelUnFinishedColor: "#333333",

  separatorFinishedColor: "#2FB86E",
  separatorUnFinishedColor: "#D2D2E3"
}

const styles = StyleSheet.create({
  form: {
    height: Dimensions.get("screen").height
  },
});