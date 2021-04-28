import React, { useRef, useState } from 'react'

import { 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  View, 
  TouchableWithoutFeedback,
  TextInput, 
  Alert
} from 'react-native';

import * as Yup from 'yup';

import { AxiosError } from 'axios';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import StepIndicator from 'react-native-step-indicator';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import { Input } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import SucessScreen from '../../components/SucessScreen';
import api from '../../services/api';

interface ValidationErrors {
  [key: string]: string;
}

interface DataProps {
  foto: string;
  nome: string;
  cpf: string;
  telefone: string;
  celular: string;
  sexo_id: number;
  cidade_id: number;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
}

interface LoginDataProps {
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
  
  async function handleSubmit(loginData: LoginDataProps) {
    const {
      foto,
      nome, 
      cpf, 
      telefone, 
      celular, 
      sexo_id, 
      cidade_id, 
      bairro, 
      logradouro, 
      numero, 
      complemento, 
      cep 
    } = params;

    const { email, senha } = loginData;

    const threeSeconds = 3000;

    const data = new FormData();

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

      data.append('foto', {
        name: 'image_mobile.jpg',
        type: 'image/jpg',
        uri: foto
      } as any);
      data.append('nome', nome); 
      data.append('cpf', cpf); 
      data.append('telefone', telefone); 
      data.append('celular', celular); 
      data.append('sexo_id', String(sexo_id)); 
      data.append('cidade_id', String(cidade_id)); 
      data.append('bairro', bairro); 
      data.append('logradouro', logradouro); 
      data.append('numero', numero); 
      data.append('complemento', complemento); 
      data.append('cep', cep);
      data.append('email', email);
      data.append('senha', senha);

      await api.post('cadastro', data).then(() => {
        setSucessMessage(true);
        
        setTimeout(() => {
          handleNavigateToLogin();
        }, threeSeconds);
      }).catch((error: AxiosError) => {
        const apiErrorMessage = error.response?.data.erro;

        Alert.alert('Erro ao se cadastrar', apiErrorMessage);
      });
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