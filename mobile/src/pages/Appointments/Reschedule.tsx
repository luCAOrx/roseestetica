import React from 'react';

import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CustomButton from '../../components/Button';
import CustomCalendar from '../../components/Calendar';
import Header from '../../components/Header';

export default function Reschedule() {
  return (
    <>
    <Header title="Selecione o dia" showIcon={true} fontSize ={26} />
    <ScrollView>        
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

      <CustomButton 
        title="REMARCAR" 
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