import React, { useEffect, useRef } from 'react'

import { BackHandler, KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import StepIndicator from 'react-native-step-indicator';

import { Input } from '../../components/Form/index';
import Button from '../../components/Button';
import Select from '../../components/CustomPicker';
import Header from '../../components/Header';

export default function PersonalData() {
  const navigation = useNavigation();

  const genders = [
    {label: "Masculino", value: "masculino"},
    {label: "Feminino", value: "feminino"},
  ]

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

  const formRef = useRef<FormHandles>(null);
  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <>
      <Header title="Dados Pessoais" showIcon={false} fontSize={26} />
      <KeyboardAvoidingView behavior="height" >

        <ScrollView>
          <StepIndicator stepCount={3} customStyles={stepStyles}/>

          <View style={{marginTop: 40}}>
            <Form ref={formRef} onSubmit={handleSubmit}>
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

              <Select icon="face" placeholder="Sexo" options={genders}/>

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

              <Button 
                title="PRÓXIMO" 
                backgroundColor="#3A4498"
                onPress={() => {
                  formRef.current?.submitForm();
                  handleNavigateToAddress();
                }} 
              />
            </Form>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
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