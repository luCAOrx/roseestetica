import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import { MaterialIcons as Icon } from '@expo/vector-icons';

import locale from '../../config/locale';

import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';

import CustomButton from '../../components/Button';
import Header from '../../components/Header';

interface Hour {
  id: number;
  horario: string;
}

export default function Reschedule() {
  locale

  const [hours, setHours] = useState<Hour[]>([]);
  const [selectedHour, setSelectedHour] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');
  
  const onDayPress = (day: any) => {
    console.log('selected day', day);
    setSelectedDay(day.dateString);
  };

  function handleSelectHour(id: number) {
    const alreadySelected = selectedHour.findIndex(hour => hour === id);

    if (alreadySelected >= 0) {
      const filteredHours = selectedHour.filter(hour => hour !== id);

      setSelectedHour(filteredHours);
    } else {
      setSelectedHour([id]);
    }
  }

  useEffect(() => {
    api.get('horarios').then(response => {
      setHours(response.data);
    });
  }, []);

  return (
    <>
    <Header title="Selecione o dia" showIcon={true} fontSize ={26} />
    <ScrollView>        
      <Calendar 
        enableSwipeMonths
        onDayPress={onDayPress}
        renderArrow={(direction = "left" ) => (
          <>
            {direction === "left" ? 
              <Icon 
                name="navigate-before" 
                color="#D2D2E3"
                size={25} 
              /> :
              <Icon 
                name="navigate-next" 
                color="#D2D2E3"
                size={25} 
              />
            }
          </>
        )}
        markedDates={{
          [selectedDay]: {selected: true, selectedColor: "#333529"}
        }}

        theme={{
          backgroundColor: "#181818",
          calendarBackground: "#181818",
          textSectionTitleColor: "#D2D2E3",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#D2D2E3",
          textDisabledColor: "#606060",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "#D2D2E3",
          monthTextColor: "#D2D2E3",
          indicatorColor: "#D2D2E3",
          textDayFontFamily: "Roboto_400Regular",
          textMonthFontFamily: "Roboto_400Regular",
          textDayHeaderFontFamily: "Roboto_400Regular",
          textDayFontWeight: "400",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "400",
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16
        }}
      />

      <Header title="Selecione o horário" showIcon={false} fontSize={26} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {hours.map(hour => (
          <RectButton 
            key={String(hour.id)}
            style={[
              styles.hour,
              selectedHour.includes(hour.id) ? styles.selectedHour : {}
            ]}
            onPress={() => {handleSelectHour(hour.id), console.log(selectedHour)}}
          >
            <Text style={styles.hourTitle}>{hour.horario}</Text>
          </RectButton>
        ))}
      </ScrollView>

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
  hour: {
    height: 60,
    margin: 15,
    width: 95,
    marginBottom: 45,

    backgroundColor: "#248E54" ,
    borderRadius: 8,

    justifyContent: "center",
    alignItems: "center",
  },
  
  hourTitle: {
    fontFamily: "Roboto_900Black",
    fontSize: 15,
    lineHeight: 18,
    color: "#D2D2E3",
  },

  selectedHour: {
    backgroundColor: "#333529"
  }
});