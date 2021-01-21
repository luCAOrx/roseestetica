import React from 'react';

import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Button from '../../components/Button';
import CustomCalendar from '../../components/Calendar';
import Header from '../../components/Header';

export default function Reschedule() {
  return (
    <>
    <ScrollView style={{backgroundColor: "#181818"}} >        
      <Header title="Selecione o dia" showIcon={true} fontSize ={26} />
      <CustomCalendar />

      <Header title="Selecione o horário" showIcon={false} fontSize={26} />
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

      <Button title="REMARCAR" backgroundColor="#3A4498" />
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