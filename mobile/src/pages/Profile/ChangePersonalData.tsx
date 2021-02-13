import React, { useEffect, useRef, useState } from 'react'

import { BackHandler, Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Input } from '../../components/Form/index';
import CustomButton from '../../components/Button';
import Select from '../../components/Select';
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

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("ChangeData");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <KeyboardAvoidingView behavior="height" >
          <View style={styles.container}>
            <Header title="Alterar Dados Pessoais" showIcon={true} fontSize={26} />
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

            <Select icon="face" placeholder="Sexo" modalHeight={290}/>

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
          </View>
        </KeyboardAvoidingView>
      </Form>
      <SucessScreen title="Cadastro atualizado!" show={sucessMessage}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
  },
});