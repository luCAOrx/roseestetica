import React from 'react';

import { View } from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['pt-BR'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado-feira','Domingo-feira'],
  dayNamesShort: ['Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.','Dom.'],
}

LocaleConfig.defaultLocale = 'pt-BR';

export default function CustomCalendar() {
  return (
    <View>
      <Calendar 
        // disableMonthChange={true}
        // hideArrows={true}

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
    </View>
  );
}