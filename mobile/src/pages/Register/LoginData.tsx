import React, { useRef, useState } from 'react'

import { KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import StepIndicator from 'react-native-step-indicator';

import { Input, InputPassword } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import SucessScreen from '../../components/SucessScreen';
import Header from '../../components/Header';

export default function LoginData() {
  const formRef = useRef<FormHandles>(null);

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

  const navigation = useNavigation();

  function handleNavigateToLogin() {
    navigation.navigate("Login");
  }
  
  function handleSubmit(data: any) {
    setSucessMessage(true);
    console.log(data);
  }

  return (
    <>
      <Header title="Dados de Login" showIcon={false} fontSize={26} />
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

              <CustomButton 
                title="FINALIZAR" 
                backgroundColor="#3A4498"
                height={50}
                fontSize={15}
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
      </KeyboardAvoidingView>
      <SucessScreen title="Cadastro concluído!" show={sucessMessage}/>
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