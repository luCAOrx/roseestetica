import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Button from '../../components/Button';
import CustomCalendar from '../../components/Calendar';
import CustonCheckbox from '../../components/Checkbox';
import Header from '../../components/Header';

export default function Schedule() {
  return (
    <>
      <ScrollView style={{backgroundColor: "#181818"}} >        
        <Header title="Selecione o dia" showIcon={false} />
        <CustomCalendar />

        <Header title="Selecione o horário" showIcon={false} />
        <View style={styles.buttonContainer} >
          <Button title="08:00" width={105} backgroundColor="#248E54" />
          <Button title="10:00" width={105} backgroundColor="#248E54" />
          <Button title="12:00" width={105} backgroundColor="#248E54" />
        </View>
        <View style={styles.buttonContainer} >
          <Button title="14:00" width={105} backgroundColor="#248E54" />
          <Button title="16:00" width={105} backgroundColor="#248E54" />
          <Button title="18:00" width={105} backgroundColor="#248E54" />
        </View>
        <View style={styles.buttonContainer} >
          <Button title="20:00" width={105} backgroundColor="#248E54" />
        </View>

        <Header title="Selecione o procedimento" showIcon={false} />
        <CustonCheckbox text="Tratamento" price="R$ 30,00" />
        <CustonCheckbox text="Limpeza de pele" price="R$ 40,00" />
        <CustonCheckbox text="Tratamento + limpeza de pele" price="R$ 50,00" />

        <Button title="AGENDAR" backgroundColor="#3A4498" />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
});