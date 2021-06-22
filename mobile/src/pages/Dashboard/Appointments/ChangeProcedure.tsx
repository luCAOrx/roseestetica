import React, { useEffect, useRef, useState} from 'react';

import { Alert, ScrollView } from 'react-native';

import { useNavigation, useRoute, useTheme } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Header from '../../../components/Header';
import { SelectProcedure } from '../../../components/Form';
import CustomButton from '../../../components/Button';
import SucessScreen from '../../../components/SucessScreen';

import * as Yup from 'yup';

import api from '../../../services/api';

import { AxiosError } from 'axios';

import getValidationErros from '../../../utils/handleErrors';

interface Procedure {
  id: number;
  procedimento: string;
  preco: string;
};

interface ScheduleData {
  procedimento_id: Array<number>;
};

interface ScheduleParams {
  agendamento_id: number;
};

export default function Schedule() {
  const route = useRoute();
  const params = route.params as ScheduleParams;

  const {colors} = useTheme();

  const [procedures, setProcedures] = useState<Procedure[]>([]);

  const [selectedProcedure, setSelectedProcedure] = useState<number[]>([]);
  const [sucessMessage, setSucessMessage] = useState<Boolean>(false);

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  useEffect(() => {
    api.get('procedimentos').then(response => {
      setProcedures(response.data);
    });
  }, []);
  
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
    const {procedimento_id} = scheduleData;

    const data = {procedimento_id};

    const threeSeconds = 3000;

    try {
      const schema = Yup.object().shape({
        procedimento_id: Yup.array().min(1, "Você precisa selecionar um procedimento!"),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      formRef.current?.setErrors({});

      api.put(`alterar_procedimento/${params.agendamento_id}`, data).then(() => {
        setSucessMessage(true);

        setTimeout(() => {
          setSucessMessage(false);

          navigation.reset({
            index: 0,
            routes: [{name: 'Appointments'}]
          });
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

  return (
    <>
      <ScrollView>        
        <Header title="Alterar o procedimento" showIcon fontSize={25} />
        <Form ref={formRef} onSubmit={handleSubmit} >
          {procedures.map(procedure => (
            <SelectProcedure
              key={procedure.id} 
              name="procedimento_id" 
              procedure={procedure.procedimento} 
              price={procedure.preco}
              id={procedure.id}
              handleSelectProcedure={handleSelectProcedure}
              selectedProcedure={selectedProcedure}
            />
          ))}

          <CustomButton 
            title="ALTERAR O PROCEDIMENTO" 
            backgroundColor={colors.buttonPrimaryBackground} 
            color={colors.buttonText}
            height={50}
            fontSize={15}
            onPress={() => formRef.current?.submitForm()}
          />
        </Form>
      </ScrollView>
      <SucessScreen title="Procedimento alterado!" show={sucessMessage}/>
    </>
  );
};