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

import { useNavigation } from '@react-navigation/native';


import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import { Input }  from '../../components/Form/index';
import CustomButton from '../../components/Button';
import SucessScreen from '../../components/SucessScreen';

interface ValidationErrors {
  [key: string]: string;
}

interface LoginDataProps {
  email: string;
  senha: string;
}

export default function ChangeLoginData() {
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

  const navigation = useNavigation();

  function handleNavigateToChangeData() {
    navigation.navigate("ChangeData");
  }
  
  async function handleSubmit(loginData: LoginDataProps) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("O campo e-mail precisa ser um e-mail válido!")
          .optional()
          .max(80, "No máximo 80 caracteres!"),
        senha: Yup.string().optional()
          .min(5, "No mínimo 5 caracteres!")
          .max(50, "No máximo 50 caracteres!"),
      });

      await schema.validate(loginData, {
        abortEarly: false
      });

      formRef.current?.setErrors({});
      
      setSucessMessage(true);

      setTimeout(() => {
        handleNavigateToChangeData();
      }, 3000);

      console.log(loginData);
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
            <Header title="Dados de Login" showIcon={true} fontSize={26} />
            <View style={{marginTop: 20}}/>
            <Input 
              placeholder="Email"
              icon="email"
              name="email"
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
              isPassword
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <CustomButton 
              title="PRONTO" 
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
      <SucessScreen title="Cadastro atualizado!" show={sucessMessage}/>
    </KeyboardAvoidingView>
  );
}