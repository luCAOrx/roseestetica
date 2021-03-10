import React, { useRef, useState } from 'react'

import { Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Input, Select } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import Header from '../../components/Header';
import SucessScreen from '../../components/SucessScreen';

export default function ChangePersonalData() {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const [ sucessMessage, setSucessMessage ] = useState<Boolean>(false);

  function handleNavigateToChangeData() {
    navigation.navigate("ChangeData");
  }

  function handleSubmit(data: any) {
    setSucessMessage(true);
    console.log(data);
  }

  return (
    <Form style={styles.form} ref={formRef} onSubmit={handleSubmit}>
      <Header title="Dados pessoais" showIcon={true} fontSize={26}/>
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
        placeholder="Sexo" 
        name="sexo"
        modalHeight={255} 
        snapPoint={255}
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
      <SucessScreen title="Cadastro atualizado!" show={sucessMessage}/>
    </Form>
  );
}

const styles = StyleSheet.create({
  form: {
    height: Dimensions.get("screen").height,
  },
});