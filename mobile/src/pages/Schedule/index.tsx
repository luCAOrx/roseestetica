import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import { BackHandler, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import CustomButton from '../../components/Button';
import CustomCalendar from '../../components/Calendar';
import CustonCheckbox from '../../components/Checkbox';
import Header from '../../components/Header';

interface Hour {
  id: number;
  horario: string;
}

export default function Schedule() {
  const [hours, setHour] = useState<Hour[]>([]);

  useFocusEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  useEffect(() => {
    api.get('horarios').then(response => {
      setHour(response.data);
    });
  }, []);

  return (
    <>
      <ScrollView style={{backgroundColor: "#181818"}} >        
        <Header title="Selecione o dia" showIcon={false} fontSize={26} />
        <CustomCalendar />

        <Header title="Selecione o horário" showIcon={false} fontSize={26} />
        <View style={styles.buttonContainer} >
          {hours.map(hour => (
            <CustomButton 
              key={String(hour.id)}
              title={hour.horario} 
              width={105} 
              backgroundColor="#248E54" 
              height={50}
              fontSize={15}
            />
          ))}
        </View>

        <Header title="Selecione o procedimento" showIcon={false} fontSize={26} />
        <CustonCheckbox text="Tratamento" price="R$ 30,00" />
        <CustonCheckbox text="Limpeza de pele" price="R$ 40,00" />
        <CustonCheckbox text="Tratamento + limpeza de pele" price="R$ 50,00" />

        <CustomButton 
          title="AGENDAR" 
          backgroundColor="#3A4498" 
          height={50}
          fontSize={15}
        />
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