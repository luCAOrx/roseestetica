import React, { useRef, useState } from 'react'

import { 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  View, 
  TouchableWithoutFeedback,
  TextInput 
} from 'react-native';

import * as Yup from 'yup';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import StepIndicator from 'react-native-step-indicator';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import { Input } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import SucessScreen from '../../components/SucessScreen';

interface ValidationErrors {
  [key: string]: string;
}

interface DataProps {
  nome: string;
  cpf: string;
  telefone: string;
  celular: string;
  sexo: string[];
  cidade: string[];
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  email: string;
  senha: string;
}

export default function LoginData() {
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as DataProps;

  function handleNavigateToLogin() {
    navigation.navigate("Login");
  }
  
  async function handleSubmit(loginData: DataProps) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("O campo e-mail precisa ser um e-mail válido!")
          .max(80, "No máximo 80 caracteres!")
          .required("O campo email é obrigatório!"),
        senha: Yup.string()
          .min(8, "No mínimo 8 caracteres!")
          .max(50, "No máximo 50 caracteres!")
          .required("O campo senha é obrigatório!"),
      });

      await schema.validate(loginData, {
        abortEarly: false
      });

      formRef.current?.setErrors({});
      
      setSucessMessage(true);

      setTimeout(() => {
        handleNavigateToLogin();
      }, 3000);

      console.log(loginData, params);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: ValidationErrors = {};

        err.inner.forEach((error) => {
          validationErrors[`${error.path}`] = error.message;
        });
        
        formRef.current?.setErrors(validationErrors);
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Header title="Dados de Login" showIcon={false} fontSize={26} />
            <StepIndicator stepCount={3} customStyles={stepStyles} currentPosition={2}/>
            <View style={{marginTop: 20}} />
            <Input 
              placeholder="E-mail"
              icon="email"
              name="email"
              maxLength={80}
              keyboardType="email-address"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              blurOnSubmit={false}
            />

            <Input 
              ref={passwordRef}
              placeholder="Senha"
              icon="lock"
              name="senha"
              maxLength={50}
              isPassword
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <CustomButton 
              title="FINALIZAR" 
              backgroundColor="#3A4498"
              height={50}
              fontSize={15}
              onPress={() => {
                formRef.current?.submitForm();
              }} 
            />
          </Form>
        </ScrollView>
      </TouchableWithoutFeedback>
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