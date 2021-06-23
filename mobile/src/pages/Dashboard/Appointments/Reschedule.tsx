import React, { useEffect, useRef, useState} from 'react';

import { Alert, RefreshControl, ScrollView } from 'react-native';

import { useNavigation, useRoute, useTheme } from '@react-navigation/native';

import { DateObject } from 'react-native-calendars';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { SelectDate, SelectHour } from '../../../components/Form';
import Header from '../../../components/Header';
import CustomButton from '../../../components/Button';
import SucessScreen from '../../../components/SucessScreen';

import { useAuth } from '../../../contexts/auth';

import * as Yup from 'yup';

import api from '../../../services/api';

import { AxiosError } from 'axios';

import getValidationErros from '../../../utils/handleErrors';

interface ReScheduleData {
  data: string;
  horario_id: Array<number>;
};

interface AvailableAppointments {
  id: number;
  data: string;
  horario: string;
  situacao: string;
};

interface ScheduleParams {
  id: number;
};

export default function Schedule() {
  const {cliente} = useAuth();

  const route = useRoute();
  const params = route.params as ScheduleParams;

  const {colors} = useTheme();

  const [
    availableAppointments, 
    setAvailableAppointments
  ] = useState<AvailableAppointments[]>([]);

  const [selectedDay, setSelectedDay] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [sucessMessage, setSucessMessage] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const situation = availableAppointments.map(schedule => schedule.situacao);

  const availableHour = availableAppointments.map(schedule => schedule.horario);

  useEffect(() => {
    async function loadavAilableSchedules() {
      api.get('agendamentos_disponiveis', {params: {
        data: selectedDay
      }}).then(response => {
        setAvailableAppointments(response.data);
      });
    };

    loadavAilableSchedules();
  }, [selectedDay]);

  const onDayPress = (day: DateObject) => {
    setSelectedDay(day.dateString);
  };

  function handleNavigateToAppointments() {
    navigation.navigate("Appointments");
  };

  async function handleSubmit(scheduleData: ReScheduleData) {
    const {data, horario_id} = scheduleData;

    const dataFinal = {data, horario_id};

    const threeSeconds = 3000;

    try {
      const schema = Yup.object().shape({
        data: Yup.string().required("Você precisa selecionar um dia!"),
        horario_id: Yup.array().min(1, "Você precisa selecionar um horário!"),
      });

      await schema.validate(dataFinal, {
        abortEarly: false
      });

      formRef.current?.setErrors({});

      await api.put(`remarcar/${params.id}/${cliente?.id}`, dataFinal).then(() => {
        setSucessMessage(true);

        setTimeout(() => {
          setSucessMessage(false);

          navigation.reset({
            index: 0,
            routes: [{name: 'Appointments'}]
          });

          handleNavigateToAppointments();
        }, threeSeconds);
      }).catch((err: AxiosError) => {
        const apiErrorMessage = err.response?.data.erro;
        Alert.alert("Erro", apiErrorMessage);
      });
      
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        
        formRef.current?.setErrors(errors);
      };
    };
  };

  // useFocusEffect(() => {
  //   const backAction = () => {
  //     BackHandler.exitApp();
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // });

  async function refreshAvailablesSchedules() {
    setRefreshing(true);

    navigation.reset({
      index: 0,
      routes: [{name: 'Reschedule'}]
    })

    setRefreshing(false);
  };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={refreshAvailablesSchedules}
          />
        }
      >       
        <Header title="Remarcar agendamento" showIcon fontSize={25} /> 
        <Form 
          ref={formRef} 
          style={{flexGrow: 1}} 
          onSubmit={handleSubmit}
        >
          <SelectDate name="data" selectedDay={selectedDay} onDayPress={onDayPress}/>

          {selectedDay ? 
            <>
              <Header title="Selecione o horário" showIcon={false} fontSize={26} />
              <SelectHour
                name="horario_id"
                available={situation}
                availableTime={availableHour}
                selectedDay={selectedDay} 
              />
            </> :
            null
          }

          <CustomButton 
            title="REMARCAR" 
            backgroundColor={colors.buttonPrimaryBackground} 
            color={colors.buttonText}
            height={50}
            fontSize={15}
            onPress={() => formRef.current?.submitForm()}
          />
        </Form>
      </ScrollView>
      <SucessScreen title="Remarcado com sucesso!" show={sucessMessage}/>
    </>
  );
};