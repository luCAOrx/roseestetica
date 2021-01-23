import React, { useEffect, useRef, useState } from 'react'

import { BackHandler, KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Input } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import Select from '../../components/CustomPicker';
import Header from '../../components/Header';
import SucessScreen from '../../components/SucessScreen';

export default function ChangePersonalData() {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

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

  function handleNavigateToChangeData() {
    navigation.navigate("ChangeData");
  }

  function handleSubmit(data: any) {
    setSucessMessage(true);
    console.log(data);
  }

  return (
    <>
      <Header title="Alterar Dados Pessoais" showIcon={true} fontSize={26} />
      <KeyboardAvoidingView behavior="height" >
        <ScrollView>
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

              <CustomButton 
                title="PRONTO" 
                backgroundColor="#3A4498"
                height={50}
                fontSize={15}
                onPress={() => {
                  formRef.current?.submitForm();
                  setTimeout(() => {
                    handleNavigateToChangeData();
                  }, 3000);
                }} 
              />
            </Form>
          </View>
        </ScrollView>
        <SucessScreen title="Cadastro atualizado!" show={sucessMessage}/>
      </KeyboardAvoidingView>
    </>
  );
}