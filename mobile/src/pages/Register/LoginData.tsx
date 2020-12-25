import React, { useRef, useState } from 'react'

import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import StepIndicator from 'react-native-step-indicator';

import { Input, InputPassword } from '../../components/Form/index';
import Button from '../../components/Button';
import SucessScreen from '../../components/SucessScreen';

export default function LoginData() {
  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

  const navigation = useNavigation();

  function handleNavigateToLogin() {
    navigation.navigate("Login");
  }

  const formRef = useRef<FormHandles>(null);
  
  function handleSubmit(data: any) {
    setSucessMessage(true);
    console.log(data);
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <StepIndicator stepCount={3} customStyles={stepStyles} currentPosition={2}/>

        <View style={{marginTop: 40}}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input 
              placeholder="Email"
              icon="email"
              autoCapitalize="words"
              returnKeyType="next"
              name="email"
            />

            <InputPassword 
              placeholder="Senha"
              icon="lock"
              name="senha"
              returnKeyType="send"
            />

            <Button 
              title="FINALIZAR" 
              onPress={() => {
                formRef.current?.submitForm();
                setTimeout(() => {
                  handleNavigateToLogin();
                }, 3000);
              }} 
            />
          </Form>
        </View>
      </ScrollView>
      <SucessScreen title="Cadastro concluído!" show={sucessMessage}/>
    </KeyboardAvoidingView>
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