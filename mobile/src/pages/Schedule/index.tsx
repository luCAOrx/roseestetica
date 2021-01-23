import React, { useEffect } from 'react';

import { BackHandler, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CustomButton from '../../components/Button';
import CustomCalendar from '../../components/Calendar';
import CustonCheckbox from '../../components/Checkbox';
import Header from '../../components/Header';

export default function Schedule() {

  // useEffect(() => {
  //   const backAction = () => {
  //     BackHandler.exitApp();
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  return (
    <>
      <ScrollView style={{backgroundColor: "#181818"}} >        
        <Header title="Selecione o dia" showIcon={false} fontSize={26} />
        <CustomCalendar />

        <Header title="Selecione o horário" showIcon={false} fontSize={26} />
        <View style={styles.buttonContainer} >
          <CustomButton 
            title="08:00" 
            width={105} 
            backgroundColor="#248E54" 
            height={50}
            fontSize={15}
          />
          <CustomButton 
            title="10:00" 
            width={105} 
            backgroundColor="#248E54" 
            height={50}
            fontSize={15}
          />
          <CustomButton 
            title="12:00" 
            width={105} 
            backgroundColor="#248E54" 
            height={50}
            fontSize={15}
          />
        </View>
        <View style={styles.buttonContainer} >
          <CustomButton 
            title="14:00" 
            width={105} 
            backgroundColor="#248E54" 
            height={50}
            fontSize={15}
          />
          <CustomButton 
            title="16:00" 
            width={105} 
            backgroundColor="#248E54" 
            height={50}
            fontSize={15}
          />
          <CustomButton 
            title="18:00" 
            width={105} 
            backgroundColor="#248E54" 
            height={50}
            fontSize={15}
          />
        </View>
        <View style={styles.buttonContainer} >
          <CustomButton 
            title="20:00" 
            width={105} 
            backgroundColor="#248E54" 
            height={50}
            fontSize={15}
          />
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