import React, { useEffect, useRef, useState} from 'react';

import { Alert, RefreshControl, ScrollView } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import { DateObject } from 'react-native-calendars';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { SelectDate, SelectHour, SelectProcedure } from '../../components/Form';
import Header from '../../components/Header';
import CustomButton from '../../components/Button';
import SucessScreen from '../../components/SucessScreen';
import Loading from '../../components/Loading';

import { useAuth } from '../../contexts/auth';

import * as Yup from 'yup';

import api from '../../services/api';

import { AxiosError } from 'axios';

import getValidationErros from '../../utils/handleErrors';

interface Procedure {
  id: number;
  procedimento: string;
  preco: string;
};

interface ScheduleData {
  data: string;
  horario_id: Array<number>;
  procedimento_id: Array<number>;
};

interface AvailableAppointments {
  id: number;
  data: string;
  horario: string;
  situacao: string;
};

export default function Schedule() {
  const {cliente, requestRefreshToken} = useAuth();

  const {colors} = useTheme();

  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [
    availableAppointments, 
    setAvailableAppointments
  ] = useState<AvailableAppointments[]>([]);

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sucessMessage, setSucessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const situation = availableAppointments.map(schedule => schedule.situacao);

  const availableHour = availableAppointments.map(schedule => schedule.horario);

  useEffect(() => {
    async function loadAvailablesSchedules() {
      await api.get('agendamentos_disponiveis', {params: {
        data: selectedDay
      }}).then(response => {
        setAvailableAppointments(response.data);
      }).catch(async (error: AxiosError) => {
        const apiErrorMessage = error.response?.data.erro;

        if (error.response?.status === 401) {
          await requestRefreshToken();

          await loadAvailablesSchedules();
        };

        if (error.response?.status === 400) {
          Alert.alert('Erro', apiErrorMessage);
        };
      });
    };

    if (selectedDay) {
      setIsLoading(true);
      loadAvailablesSchedules();
      setIsLoading(false);
    };
  }, [selectedDay]);

  useEffect(() => {
    async function loadProcedures() {
      await api.get('procedimentos').then(response => {
        setProcedures(response.data);
      }).catch((error: AxiosError) => {
        const apiErrorMessage = error.response?.data.erro;

        if (error.response?.status === 400) {
          Alert.alert('Erro', apiErrorMessage);
        };
      });
    };

    loadProcedures();
  }, []);
  
  const onDayPress = (day: DateObject) => {
    setSelectedDay(day.dateString);
  };
  
  function handleSelectProcedure(id: number) {
    const alreadySelected = selectedProcedure.findIndex(procedure => procedure === id);

    if (alreadySelected >= 0) {
      const filteredProcedures = selectedProcedure.filter(procedure => procedure !== id);

      setSelectedProcedure(filteredProcedures);
    } else {
      setSelectedProcedure([...selectedProcedure, id]);
    }
  };

  async function handleSubmit(scheduleData: ScheduleData) {
    const {data, horario_id, procedimento_id} = scheduleData;

    const dataFinal = {data, horario_id, procedimento_id};

    const threeSeconds = 3000;

    try {
      const schema = Yup.object().shape({
        data: Yup.string().required("Você precisa selecionar um dia!"),
        horario_id: Yup.array().min(1, "Você precisa selecionar um horário!"),
        procedimento_id: Yup.array().min(1, "Você precisa selecionar um procedimento!"),
      });

      await schema.validate(dataFinal, {
        abortEarly: false
      });

      formRef.current?.setErrors({});

      await api.post(`agendar/${cliente?.id}`, dataFinal).then(() => {
        setSucessMessage(true);

        setTimeout(() => {
          setSucessMessage(false);

          navigation.reset({
            index: 0,
            routes: [{name: 'Schedule'}]
          });
        }, threeSeconds);
      }).catch(async (error: AxiosError) => {
        const apiErrorMessage = error.response?.data.mensagem;

        if (error.response?.status === 401) {
          await requestRefreshToken();
          formRef.current?.submitForm();
        };

        if (error.response?.status === 400) {
          Alert.alert('Erro', apiErrorMessage);
        };
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        
        formRef.current?.setErrors(errors);
      };
    };
  };

  async function refreshAvailablesSchedules() {
    setRefreshing(true);

    navigation.reset({
      index: 0,
      routes: [{name: 'Schedule'}]
    })

    setRefreshing(false);
  };

  return (
    <>
      <ScrollView 
        refreshControl={
          <RefreshControl 
            progressBackgroundColor={colors.card}
            colors={[colors.text]}
            refreshing={refreshing}
            onRefresh={refreshAvailablesSchedules}
          />
        }
      >        
        <Form 
          ref={formRef} 
          style={{flexGrow: 1}} 
          onSubmit={handleSubmit}
        >
          <Header title="Selecione o dia" showIcon={false} fontSize={26} />
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
            </> : null
          }

          <Header title="Selecione o procedimento" showIcon={false} fontSize={26} />
          {!procedures.length ? 
            <Loading /> :
            procedures.map(procedure => (
              <SelectProcedure
                key={procedure.id} 
                name="procedimento_id" 
                procedure={procedure.procedimento} 
                price={procedure.preco}
                id={procedure.id}
                handleSelectProcedure={handleSelectProcedure}
                selectedProcedure={selectedProcedure}
              />
            ))
          }

          <CustomButton 
            title="AGENDAR" 
            backgroundColor={colors.buttonPrimaryBackground} 
            color={colors.buttonText}
            height={50}
            fontSize={15}
            onPress={() => formRef.current?.submitForm()}
          />
        </Form>
      </ScrollView>
      <SucessScreen title="Agendamento concluído!" show={sucessMessage}/>
    </>
  );
};