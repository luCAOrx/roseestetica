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
import Loading from '../../../components/Loading';

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
  const {cliente, requestRefreshToken} = useAuth();

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
  const [isLoading, setIsLoading] = useState(true);

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const situation = availableAppointments.map(schedule => schedule.situacao);

  const availableHour = availableAppointments.map(schedule => schedule.horario);

  useEffect(() => {
    async function loadAvailablesSchedules() {
      api.get('agendamentos_disponiveis', {params: {
        data: selectedDay
      }}).then(response => {
        setAvailableAppointments(response.data);
      }).catch(async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await requestRefreshToken();

          await loadAvailablesSchedules();
        }
      });
    };

    setIsLoading(true);
    loadAvailablesSchedules();
    setIsLoading(false);
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
      }).catch(async (error: AxiosError) => {
        const apiErrorMessage = error.response?.data.mensagem;

        if (error.response?.status === 401) {
          await requestRefreshToken();
          formRef.current?.submitForm();
        };

        if (error.response?.status === 400) {
          Alert.alert('Falha ao remarcar agendamento', apiErrorMessage);
        };
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
              {isLoading ? (
                <Loading />
              ) : (
                <SelectHour
                  name="horario_id"
                  available={situation}
                  availableTime={availableHour}
                  selectedDay={selectedDay} 
                />
              )}
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