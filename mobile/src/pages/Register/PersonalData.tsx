import React, { useEffect, useRef } from 'react'

import { BackHandler, Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import StepIndicator from 'react-native-step-indicator';

import { Input } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import Select from '../../components/Select';
import Header from '../../components/Header';

export default function PersonalData() {
  const formRef = useRef<FormHandles>(null);

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

  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <KeyboardAvoidingView behavior="height" >
          <View style={styles.container}>
            <Header title="Dados Pessoais" showIcon={false} fontSize={26} />
            <StepIndicator stepCount={3} customStyles={stepStyles}/>
            <View style={{marginTop: 40}}>
              <Input 
                placeholder="Nome completo"
                icon="person"
                autoCapitalize="words"
                returnKeyType="next"
                name="nome"
              />
            </View>

            <Input 
              placeholder="Cpf"
              icon="fingerprint"
              keyboardType="numeric"
              returnKeyType="next"
              name="cpf"
            />

            <Select icon="face" placeholder="Sexo" modalHeight={220}/>

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
              fontSize={15}
              onPress={() => {
                formRef.current?.submitForm();
                handleNavigateToAddress();
              }} 
            />
          </View>
          
        </KeyboardAvoidingView>
      </Form>
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

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
  },
});