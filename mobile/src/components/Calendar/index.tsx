import React, { useState } from 'react';

import { MaterialIcons as Icon } from '@expo/vector-icons';

import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales["br"] = {
  monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
  monthNamesShort: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
  dayNames: ["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"],
  dayNamesShort: ["Do","Se","Te","Qu","Qu","Se","Sá"],
}

LocaleConfig.defaultLocale = "br";

export default function CustomCalendar() {
  const [selected, setSelected] = useState('');

  const onDayPress = (day: any) => {
    console.log('selected day', day);
    setSelected(day.dateString);
  };

  return (
    <>
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
          [selected]: {selected: true, selectedColor: "#333529"}
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
    </>
  );
}