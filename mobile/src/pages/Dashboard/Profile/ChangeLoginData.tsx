import React, { useEffect, useRef, useState } from 'react'

import { Alert, ScrollView } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../../contexts/auth';

import Header from '../../../components/Header';
import { Input }  from '../../../components/Form/index';
import CustomButton from '../../../components/Button';

import * as Yup from 'yup';

import api from '../../../services/api';

import getValidationErros from '../../../utils/handleErrors';

import { useTheme } from '@react-navigation/native';
import { useSuccessScreen } from '../../../contexts/successScreen';

interface LoginData {
  email: string;
};

export default function ChangeLoginData() {
  const {cliente, updateProfile, requestRefreshToken} = useAuth();

  const {colors} = useTheme();

  const formRef = useRef<FormHandles>(null);

  const [ isRequested, setIsRequested ] = useState(false);

  const { 
    handleShowSuccessMessage, 
    handleTitleSuccessMessage 
  } = useSuccessScreen();

  useEffect(() => {
    formRef.current?.setData({
      email: cliente?.email
    });
  }, []);
  
  async function handleSubmit(loginData: LoginData) {
    const threeSeconds = 3000;

    const {email} = loginData;

    const data = {email};

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("O campo e-mail precisa ser um e-mail válido!")
          .max(80, "No máximo 80 caracteres!")
          .required("O campo email é obrigatório!")
      });

      await schema.validate(data, {
        abortEarly: false
      });

      formRef.current?.setErrors({});

      setIsRequested(true);

      await api.put(`atualizar_login/${cliente?.id}`, data).then(response => {
        setIsRequested(false);

        updateProfile(response.data.cliente);

        handleTitleSuccessMessage("Login atualizado")
        handleShowSuccessMessage(true);
        
        setTimeout(() => {  
          handleShowSuccessMessage(false);
        }, threeSeconds);

        setIsRequested(false);
      }).catch(async error => {
        const apiErrorMessage = error.response.data.erro;

        if (error.response.status === 401) {
          await requestRefreshToken();
          formRef.current?.submitForm();
        };

        if (error.response.status === 400) {
          setIsRequested(false);

          Alert.alert('Erro', apiErrorMessage);
        };
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setIsRequested(false);

        const errors = getValidationErros(err);
        
        formRef.current?.setErrors(errors);
      };
    };
  };

  return (
    <>
      <ScrollView>
        <Form 
          ref={formRef}
          initialData={Object(cliente)} 
          onSubmit={handleSubmit}
        >
          <Header title="Dados de login" showIcon fontSize={26}/>
          <Input 
            placeholder="E-mail"
            icon="email"
            name="email"
            maxLength={80}
            keyboardType="email-address"
            autoCapitalize="words"
            returnKeyType="send"
            onSubmitEditing={() => {
              setIsRequested(true);
              
              formRef.current?.submitForm();
            }} 
          />

          <CustomButton 
            title="Atualizar" 
            backgroundColor={colors.buttonPrimaryBackground}
            color={colors.buttonText}
            height={50}
            fontSize={18}
            isRequested={isRequested}
            onPress={() => {
              setIsRequested(true);

              formRef.current?.submitForm();
            }} 
          />
        </Form>
      </ScrollView>
    </>
  );
};