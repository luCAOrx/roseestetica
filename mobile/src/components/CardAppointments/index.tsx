import React, { memo, useState } from 'react';

import api from '../../services/api';

import { Alert, Text, View } from 'react-native';

import styles from './styles';

import { useNavigation, useTheme } from '@react-navigation/native';

import { MaterialIcons as Icon } from '@expo/vector-icons';

import CustomButton from '../../components/Button';

import dayjs from 'dayjs';

import { useAuth } from '../../contexts/auth';
import { useSuccessScreen } from '../../contexts/successScreen';

interface CardAppointmentsProps {
  text: string;
  agendamento_id: number;
  id: number;
  date: string;
};

function CardAppointments({text, agendamento_id, id, date}: CardAppointmentsProps) {
  const [ isRequested, setIsRequested] = useState(false);

  const {colors} = useTheme();

  const navigation = useNavigation();

  const dateOfNow = dayjs().format('YYYY/MM/DD');

  const {requestRefreshToken} = useAuth();

  const { 
    handleShowSuccessMessage, 
    handleTitleSuccessMessage 
  } = useSuccessScreen();

  const threeSeconds = 3000;

  function handleNavigateToDetail() {
    navigation.navigate('Detail' as never, {agendamento_id} as never);
  };

  function handleNavigateToReschedule() {
    navigation.navigate('Reschedule' as never, {id} as never);
  };

  function handleNavigateToChangeProcedure() {
    navigation.navigate('ChangeProcedure' as never, {agendamento_id} as never);
  };

  async function handleDeleteSchedule() {
    Alert.alert('Cancelar agendamento', 'Tem certeza que deseja cancelar seu agendamento?', [
      {
        text: 'Sim',
        onPress: async () => {
          setIsRequested(true);

          await api.delete(`cancelar/${id}`).then(() => {
            setIsRequested(false);
            handleTitleSuccessMessage("Deletado com sucesso");
            handleShowSuccessMessage(true);
  
            setTimeout(() => {
              handleShowSuccessMessage(false);
    
              navigation.reset({
                index: 0,
                routes: [{name: 'Appointments' as never}]
              });
            }, threeSeconds);
          }).catch(async error => {
            const apiErrorMessage = error.response.data.mensagem
  
            setIsRequested(false);
      
            if (error.response.status === 401) {
              await requestRefreshToken();
      
              await api.delete(`cancelar/${id}`).then(() => {
                setIsRequested(false);
                handleShowSuccessMessage(true);
  
                handleTitleSuccessMessage("Deletado com sucesso");
                
                setTimeout(() => {
                  handleShowSuccessMessage(false);
        
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Appointments' as never}]
                  });
                }, threeSeconds);
              })
            };
      
            if (error.response.status === 400) {
              setIsRequested(false);
              
              Alert.alert('Falha ao cancelar agendamento', apiErrorMessage);
            };
      
          })
        }
      },
      {
        text: 'Não',
        onPress: () => { setIsRequested(false) }
      }
    ]);
  };

  return (
    <View 
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          height: dayjs(date).isBefore(dayjs(dateOfNow)) ? 160 : 400
        }
      ]}
      testID="card"
    >
      <View style={styles.header}>
        <Icon name="event-available" size={20} color={colors.text}/>
        <Text 
          style={[
            styles.text,
            {color: colors.text}
          ]}
          testID="text-card"
        >
          {text}
        </Text>
      </View>
      <CustomButton 
        title="VER DETALHES" 
        backgroundColor={colors.buttonSecondaryBackground} 
        color={colors.buttonText}
        height={50}
        fontSize={15}
        onPress={handleNavigateToDetail}
      />
      {dayjs(date).isBefore(dateOfNow) ? (
          <View />
        ) : (
          <>
            <CustomButton 
              title="REMARCAR" 
              backgroundColor={colors.buttonSecondaryBackground} 
              color={colors.buttonText}
              height={50}
              fontSize={15}
              onPress={handleNavigateToReschedule}
              disabled={dayjs(date).isBefore(dateOfNow) ? true : false}
            />
            <CustomButton 
              title="ALTERAR PROCEDIMENTO" 
              backgroundColor={colors.buttonSecondaryBackground} 
              color={colors.buttonText}
              height={50}
              fontSize={15}
              onPress={handleNavigateToChangeProcedure}
              disabled={dayjs(date).isBefore(dateOfNow) ? true : false}
            />
            <CustomButton 
              title="CANCELAR" 
              backgroundColor={colors.buttonTertiaryBackground} 
              color={colors.buttonText}
              height={50}
              fontSize={15}
              isRequested={isRequested}
              onPress={() => {
                handleDeleteSchedule();
              }}
              disabled={dayjs(date).isBefore(dateOfNow) ? true : false}
            />
          </>
        )}
    </View>
  );
};

export default memo(CardAppointments);