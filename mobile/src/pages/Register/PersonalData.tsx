import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { MaterialIcons } from '@expo/vector-icons';

import {Input} from '../../components/Form/index';
import Button from '../../components/Button';
import CustomPicker from '../../components/CustomPicker';
import { Picker } from '@react-native-community/picker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';

export default function PersonalData() {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState<ItemValue>("Sexo");

  const stepStyles = {
    currentStepLabelColor: '#f0f0f5',
    stepStrokeCurrentColor: "#2FB86E",
    stepIndicatorLabelCurrentColor: '#f0f0f5',
    stepIndicatorCurrentColor: "#333333",
    stepIndicatorFinishedColor: "#2FB86E",
    stepIndicatorUnFinishedColor: "#333333",
    stepIndicatorLabelFinishedColor: "#f0f0f5",
    stepIndicatorLabelUnFinishedColor: "#f0f0f5",
    separatorFinishedColor: "#2FB86E",
    separatorUnFinishedColor: "#333333"
  }

  function handleNavigateToAddress() {
    navigation.navigate('Address');
  }

  const formRef = useRef<FormHandles>(null);
  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <StepIndicator stepCount={3} customStyles={stepStyles}/>
        <View style={styles.inputContainer}>
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
              <View style={{ marginRight: 15, marginLeft: 15, borderRadius: 8, backgroundColor: "#fff" }}>
                <MaterialIcons name="face" color="#333333" size={20}/>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  itemStyle={{color: "#333333"}}
                >
                  <Picker.Item value="masculino" color="#333333" label="Masculino"/>
                  <Picker.Item value="feminino" color="#333333" label="Feminino"/>
                </Picker>

              </View>
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
            <Button title="PRÓXIMO" onPress={() => {
              formRef.current?.submitForm()
              handleNavigateToAddress()
            }} />
          </Form>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    marginTop: 40,
  }
});